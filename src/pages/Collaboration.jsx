
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Calendar, 
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Globe,
  Star,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Collaboration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('collaborators');

  const handleFeatureClick = (feature) => {
    toast({
      title: `🤝 ${feature}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const collaborators = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'Lead Researcher',
      institution: 'MIT',
      expertise: ['Machine Learning', 'Climate Science'],
      status: 'online',
      avatar: 'SJ',
      projects: 3,
      rating: 4.9,
      lastActive: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@stanford.edu',
      role: 'Data Scientist',
      institution: 'Stanford University',
      expertise: ['Data Analysis', 'Statistics'],
      status: 'away',
      avatar: 'MC',
      projects: 5,
      rating: 4.8,
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@caltech.edu',
      role: 'Research Associate',
      institution: 'Caltech',
      expertise: ['Quantum Computing', 'Physics'],
      status: 'offline',
      avatar: 'ER',
      projects: 2,
      rating: 4.7,
      lastActive: '3 hours ago'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      email: 'james.wilson@harvard.edu',
      role: 'Professor',
      institution: 'Harvard University',
      expertise: ['Biomedical Engineering', 'AI'],
      status: 'online',
      avatar: 'JW',
      projects: 7,
      rating: 5.0,
      lastActive: 'Just now'
    }
  ];

  const meetings = [
    {
      id: 1,
      title: 'Weekly Research Sync',
      participants: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'You'],
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '1 hour',
      type: 'recurring',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Paper Review Discussion',
      participants: ['Dr. Emily Rodriguez', 'You'],
      date: '2024-01-22',
      time: '2:00 PM',
      duration: '45 minutes',
      type: 'one-time',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Grant Proposal Planning',
      participants: ['Dr. James Wilson', 'Dr. Sarah Johnson', 'You'],
      date: '2024-01-18',
      time: '3:00 PM',
      duration: '2 hours',
      type: 'one-time',
      status: 'completed'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Climate Change ML Models',
      collaborators: ['Dr. Sarah Johnson', 'Dr. Michael Chen'],
      progress: 75,
      deadline: '2024-02-15',
      status: 'active',
      tasks: 12,
      completedTasks: 9
    },
    {
      id: 2,
      title: 'Quantum Algorithm Research',
      collaborators: ['Dr. Emily Rodriguez'],
      progress: 45,
      deadline: '2024-03-01',
      status: 'active',
      tasks: 8,
      completedTasks: 4
    },
    {
      id: 3,
      title: 'Medical AI Applications',
      collaborators: ['Dr. James Wilson'],
      progress: 90,
      deadline: '2024-01-30',
      status: 'review',
      tasks: 15,
      completedTasks: 14
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'collaborators', label: 'Collaborators', icon: Users },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'projects', label: 'Projects', icon: Activity }
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
          <h1 className="text-3xl font-bold gradient-text">Collaboration Hub</h1>
          <p className="text-gray-400 mt-2">Connect and collaborate with fellow researchers</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => handleFeatureClick('Schedule Meeting')}
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button
            onClick={() => handleFeatureClick('Invite Collaborator')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Invite Collaborator
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-2 border border-white/10"
      >
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'collaborators' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search collaborators..."
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Collaborators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborators.map((collaborator, index) => (
                <motion.div
                  key={collaborator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="research-card rounded-2xl p-6 hover:collaboration-glow transition-all cursor-pointer"
                  onClick={() => handleFeatureClick('Collaborator Profile')}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{collaborator.avatar}</span>
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(collaborator.status)} rounded-full border-2 border-gray-800`}></span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{collaborator.name}</h3>
                        <p className="text-sm text-gray-400">{collaborator.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">{collaborator.rating}</span>
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{collaborator.institution}</span>
                  </div>

                  {/* Expertise */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {collaborator.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{collaborator.projects} projects</span>
                    <span>{collaborator.lastActive}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick('Send Message');
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick('Video Call');
                      }}
                    >
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'meetings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Upcoming Meetings */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Upcoming Meetings</h2>
              <div className="space-y-4">
                {meetings.filter(m => m.status === 'upcoming').map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="research-card rounded-xl p-4 hover:bg-white/5 transition-all cursor-pointer"
                    onClick={() => handleFeatureClick('Meeting Details')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.time}</span>
                          </div>
                          <span>({meeting.duration})</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Participants: {meeting.participants.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeatureClick('Join Meeting');
                          }}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Past Meetings */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Recent Meetings</h2>
              <div className="space-y-4">
                {meetings.filter(m => m.status === 'completed').map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="research-card rounded-xl p-4 opacity-75 hover:opacity-100 transition-all cursor-pointer"
                    onClick={() => handleFeatureClick('Meeting Recording')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Completed</span>
                          </div>
                          <span>{meeting.date}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeatureClick('View Recording');
                        }}
                      >
                        View Recording
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="research-card rounded-2xl p-6 hover:collaboration-glow transition-all cursor-pointer"
                  onClick={() => handleFeatureClick('Project Details')}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {project.collaborators.join(', ')}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProjectStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{project.completedTasks}/{project.tasks} tasks completed</span>
                    <span>Due: {project.deadline}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick('View Tasks');
                      }}
                    >
                      View Tasks
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick('Project Chat');
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Collaboration;
