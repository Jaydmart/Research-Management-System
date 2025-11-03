
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Demo: disable popup toasts
  const navigate = useNavigate();

  // Helper to create ISO date strings relative to today
  const getDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  };

  const handleFeatureClick = (feature) => {
    if (feature === 'Start New Research') {
      // Take the user to the Data Hub (datasets) so they can upload data and start research
      navigate('/datasets');
      return;
    }
    console.info(`${feature} clicked (demo mode)`);
  };

  const stats = [
    { icon: FileText, label: 'Total Papers', value: '24', change: '+3 this week', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Collaborators', value: '12', change: '+2 new', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Citations', value: '156', change: '+12 this month', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'In Progress', value: '8', change: '3 due soon', color: 'from-orange-500 to-red-500' },
  ];

  const recentPapers = [
    {
      title: 'Machine Learning Applications in Climate Research',
      authors: 'Dr. Smith, Dr. Johnson',
      status: 'Under Review',
      journal: 'Nature Climate Change',
      date: getDate(-14),
      citations: 23,
      downloads: 145
    },
    {
      title: 'Quantum Computing Algorithms for Optimization',
      authors: 'Dr. Chen, Dr. Williams',
      status: 'Published',
      journal: 'Science',
      date: getDate(-6),
      citations: 67,
      downloads: 289
    },
    {
      title: 'Sustainable Energy Systems Analysis',
      authors: 'Dr. Brown, Dr. Davis',
      status: 'Draft',
      journal: 'Energy Policy',
      date: getDate(-3),
      citations: 12,
      downloads: 78
    }
  ];

  const upcomingDeadlines = [
    { task: 'Review for Journal of AI', date: getDate(7), priority: 'high' },
    { task: 'Conference Presentation', date: getDate(17), priority: 'medium' },
    { task: 'Grant Proposal Submission', date: getDate(27), priority: 'high' },
  ];

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Dashboard — ResearchHub :: Academic Platform</title>
      </Helmet>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back, Dr. Researcher!</h1>
            <p className="text-gray-400">Here's what's happening with your research today.</p>
          </div>
          <div className="floating-animation">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="research-card rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleFeatureClick(stat.label)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Papers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-effect rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Papers</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleFeatureClick('View All Papers')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentPapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="research-card rounded-xl p-4 hover:collaboration-glow transition-all cursor-pointer"
                onClick={() => handleFeatureClick('Paper Details')}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{paper.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{paper.authors}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{paper.journal}</span>
                      <span>{paper.date}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    paper.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                    paper.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {paper.status}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{paper.citations}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{paper.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleFeatureClick('Deadline Details')}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{deadline.task}</p>
                    <p className="text-xs text-gray-400">{deadline.date}</p>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${
                    deadline.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-600/30"
                onClick={() => handleFeatureClick('Start New Research')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Start New Research
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-600/30"
                onClick={() => handleFeatureClick('Invite Collaborator')}
              >
                <Users className="w-4 h-4 mr-2" />
                Invite Collaborator
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-600/30"
                onClick={() => handleFeatureClick('Schedule Meeting')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
