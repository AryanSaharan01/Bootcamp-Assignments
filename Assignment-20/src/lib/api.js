const API_BASE = '/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    this.setToken(data.token);
    return data;
  }

  logout() {
    this.setToken(null);
  }

  // Posts methods
  async getPosts() {
    return this.request('/posts');
  }

  async getMyPosts() {
    return this.request('/posts/my');
  }

  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: postData,
    });
  }

  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: postData,
    });
  }

  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();