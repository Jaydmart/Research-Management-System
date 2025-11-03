
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Plus, Filter, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ setMobileOpen }) => {
  const handleNotification = () => {
    // Demo: silently ignore or log instead of showing a popup
    console.info('Notifications clicked (demo mode)');
  };

  const navigate = useNavigate();

  const handleNewPaper = () => {
    // Redirect to the Papers list page for more value
    navigate('/papers');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect border-b border-white/10 px-4 py-4 md:p-6"
    >
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="md:hidden mr-3">
          <button
            onClick={() => setMobileOpen && setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
        </div>

  {/* Search Bar */}
  <div className="flex-1 max-w-full md:max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="w-full relative"
              aria-label="Site search"
            >
              {/* Hidden honeypot inputs placed before the visible input to trap password managers/autofill */}
              <input
                type="text"
                name="fake-username"
                autoComplete="username"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />
              <input
                type="password"
                name="fake-password"
                autoComplete="current-password"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />

              <input
                id="site-search"
                name="site-search"
                type="search"
                inputMode="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="Search papers, authors, or keywords..."
                aria-label="Search papers, authors, or keywords"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
              />
            </form>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

  {/* Actions */}
  <div className="flex items-center space-x-4 md:ml-6">
          <Button
            onClick={handleNewPaper}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Paper
          </Button>

          <button
            onClick={handleNotification}
            className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-white">DR</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
