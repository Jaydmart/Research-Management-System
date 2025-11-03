
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Database,
  Key,
  Mail,
  Phone,
  Camera,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const handleFeatureClick = (feature) => {
    console.info(`${feature} clicked (demo mode)`);
  };

  const handleSave = () => {
    // Demo: avoid popup; log action instead
    console.info('Settings saved (demo mode)');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account and application preferences</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass-effect rounded-2xl p-4 border border-white/10 sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="glass-effect rounded-2xl p-8 border border-white/10">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">DR</span>
                    </div>
                    <button
                      onClick={() => handleFeatureClick('Change Profile Picture')}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dr. Researcher</h3>
                    <p className="text-gray-400">Lead Research Scientist</p>
                    <Button
                      onClick={() => handleFeatureClick('Upload Photo')}
                      variant="outline"
                      size="sm"
                      className="mt-2 border-white/20 hover:bg-white/10"
                    >
                      Change Photo
                    </Button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Dr."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Researcher"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="researcher@university.edu"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                  <input
                    type="text"
                    defaultValue="University Research Center"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Leading researcher in machine learning and climate science with over 10 years of experience in academic research and collaboration."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white resize-none"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="research-card rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        'New collaboration invitations',
                        'Paper citation alerts',
                        'Meeting reminders',
                        'Weekly research summary',
                        'System updates'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="research-card rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bell className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">Push Notifications</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        'Real-time messages',
                        'Deadline reminders',
                        'Collaboration updates',
                        'Paper status changes'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                
                {/* Password */}
                <div className="research-card rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Key className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Change Password</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <Button
                      onClick={() => handleFeatureClick('Update Password')}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="research-card rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      'Make my profile public',
                      'Allow others to find me by email',
                      'Show my research interests',
                      'Display collaboration history',
                      'Enable research recommendations'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
                
                <div className="research-card rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Theme</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Dark', active: true, colors: ['bg-gray-900', 'bg-gray-800', 'bg-gray-700'] },
                      { name: 'Light', active: false, colors: ['bg-white', 'bg-gray-100', 'bg-gray-200'] },
                      { name: 'Auto', active: false, colors: ['bg-gradient-to-br from-gray-900 to-white'] }
                    ].map((theme, index) => (
                      <div
                        key={theme.name}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          theme.active ? 'border-blue-500' : 'border-white/10 hover:border-white/20'
                        }`}
                        onClick={() => handleFeatureClick(`Switch to ${theme.name} Theme`)}
                      >
                        <div className="flex space-x-2 mb-3">
                          {theme.colors.map((color, colorIndex) => (
                            <div key={colorIndex} className={`w-6 h-6 rounded ${color}`}></div>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-white">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="research-card rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Language & Region</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time</option>
                        <option value="pst">Pacific Time</option>
                        <option value="cet">Central European Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance
                </Button>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>
                
                <div className="space-y-4">
                  {[
                    { name: 'Google Scholar', description: 'Sync your publications and citations', connected: true, icon: '🎓' },
                    { name: 'ORCID', description: 'Connect your researcher identifier', connected: true, icon: '🆔' },
                    { name: 'ResearchGate', description: 'Import your research network', connected: false, icon: '🔬' },
                    { name: 'Mendeley', description: 'Sync your reference library', connected: false, icon: '📚' },
                    { name: 'Slack', description: 'Get notifications in your workspace', connected: true, icon: '💬' },
                    { name: 'Zoom', description: 'Schedule and join meetings', connected: false, icon: '📹' }
                  ].map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="research-card rounded-xl p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white">{integration.name}</h3>
                          <p className="text-sm text-gray-400">{integration.description}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleFeatureClick(`${integration.connected ? 'Disconnect' : 'Connect'} ${integration.name}`)}
                        variant={integration.connected ? 'outline' : 'default'}
                        className={integration.connected 
                          ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                        }
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
