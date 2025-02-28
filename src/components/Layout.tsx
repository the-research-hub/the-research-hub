import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Search, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Articles} from '../pages/Articles';

export function Layout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

  
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setMenuOpen(false); 
  };

  return (
    <div className="min-h-screen bg-white">
    
    <header className="bg-gradient-to-r from-blue-500 to-red-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-orange-600" />
              <div>
              <h1 className="text-2xl font-bold text-white">The Research Hub</h1>
              <p className="text-sm text-gray-200">Where Knowledge Meets Innovation</p>
              </div>
            </Link>

            
            <nav className="hidden md:flex items-center space-x-6">
        <Link to="/articles" className="text-white font-semibold text-lg hover:text-gray-200 transition duration-300">Articles</Link>
        <Link to="/editorial" className="text-white font-semibold text-lg hover:text-gray-200 transition duration-300">Editorial Board</Link>
        <Link to="/about" className="text-white font-semibold text-lg hover:text-gray-200 transition duration-300">About</Link>
        <Link to="/submit" className="text-white font-semibold text-lg hover:text-gray-200 transition duration-300">Submit</Link>
        <Link to="/author-guidelines" className="text-white font-semibold text-lg hover:text-gray-200 transition duration-300">Author Guidelines</Link>
      </nav>

     
            <button
              onClick={() => setMenuOpen(!menuOpen)}
               className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>

   
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
 
        {menuOpen && (
          <div className="md:hidden bg-white border-b shadow-md">
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link to="/articles" className="text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Articles</Link>
              <Link to="/editorial" className="text-gray-600 hover:text-gray-900">Editorial Board</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/submit" className="text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Submit</Link>
              <Link to="/author-guidelines" className="text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>Author Guidelines</Link>

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}
      </header>


      {/* <div className="bg-gradient-to-r from-orange-100 to-orange-200 border-b shadow-md"> */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 border-b shadow-md">
  
</div>


      <Outlet />

       


      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}