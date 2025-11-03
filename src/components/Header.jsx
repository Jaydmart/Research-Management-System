
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleNotification = () => {
    // Demo: silently ignore or log instead of showing a popup
    console.info('Notifications clicked (demo mode)');
  };

  const handleNewPaper = () => {
    // Demo: silently ignore or log instead of showing a popup
    console.info('New Paper clicked (demo mode)');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect border-b border-white/10 p-6"
    >
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search papers, authors, or keywords..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
            />
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
        <div className="flex items-center space-x-4 ml-6">
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
