
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Papers', path: '/papers' },
    { icon: Users, label: 'Collaboration', path: '/collaboration' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    ...(user
        ? [{ icon: LogOut, label: 'LogOut', path: '/login' }] //Redirect to login page after logout
        : [{ icon: LogIn, label: 'LogIn', path: '/' }]
        )
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="h-screen glass-effect border-r border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">ResearchHub</h1>
                <p className="text-xs text-gray-400">Academic Platform</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  {!isCollapsed && (
                    <span
                      className={`font-medium ${
                        isActive ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-white/10"
        >
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">DR</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Dr. Researcher</p>
              <p className="text-xs text-gray-400">researcher@university.edu</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
