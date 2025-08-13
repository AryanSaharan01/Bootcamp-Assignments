import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Data storage paths
const DATA_DIR = path.join(process.cwd(), 'server/data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// Initialize data storage
async function initializeData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize users file
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
    
    // Initialize posts file
    try {
      await fs.access(POSTS_FILE);
    } catch {
      await fs.writeFile(POSTS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Helper functions
async function readUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readPosts() {
  const data = await fs.readFile(POSTS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writePosts(posts) {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const users = await readUsers();
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: newUser.id, name, email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: { id: user.id, name: user.name, email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Blog posts routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await readPosts();
    const users = await readUsers();
    
    const postsWithAuthors = posts
      .filter(post => post.published)
      .map(post => {
        const author = users.find(u => u.id === post.authorId);
        return {
          ...post,
          authorName: author ? author.name : 'Unknown',
          authorEmail: author ? author.email : ''
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(postsWithAuthors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/posts/my', authenticateToken, async (req, res) => {
  try {
    const posts = await readPosts();
    const users = await readUsers();
    
    const userPosts = posts
      .filter(post => post.authorId === req.user.id)
      .map(post => {
        const author = users.find(u => u.id === post.authorId);
        return {
          ...post,
          authorName: author ? author.name : 'Unknown',
          authorEmail: author ? author.email : ''
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, published } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const posts = await readPosts();
    const newPost = {
      id: uuidv4(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      authorId: req.user.id,
      published: published || false,
      readingTime: Math.ceil(content.length / 1000),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    await writePosts(posts);
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, published } = req.body;
    
    const posts = await readPosts();
    const postIndex = posts.findIndex(p => p.id === id && p.authorId === req.user.id);
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts[postIndex] = {
      ...posts[postIndex],
      title: title || posts[postIndex].title,
      content: content || posts[postIndex].content,
      excerpt: excerpt || posts[postIndex].excerpt,
      published: published !== undefined ? published : posts[postIndex].published,
      readingTime: content ? Math.ceil(content.length / 1000) : posts[postIndex].readingTime,
      updatedAt: new Date().toISOString()
    };

    await writePosts(posts);
    res.json(posts[postIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const posts = await readPosts();
    const filteredPosts = posts.filter(p => !(p.id === id && p.authorId === req.user.id));
    
    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await writePosts(filteredPosts);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});