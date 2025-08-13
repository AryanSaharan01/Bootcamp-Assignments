import React from 'react';
import { PenTool, User, LogOut, Home, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'dashboard' | 'create' | 'auth';
  onNavigate: (page: 'home' | 'dashboard' | 'create' | 'auth') => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <PenTool className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  BlogSpace
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => onNavigate('create')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === 'create'
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Write</span>
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === 'dashboard'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('auth')}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 'auth'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white/60 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 BlogSpace. Made with React & Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}