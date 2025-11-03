
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  Star,
  Eye,
  Users,
  Globe,
  Award,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  // Demo: disable popup toasts
  const [timeRange, setTimeRange] = useState('6months');

  const handleFeatureClick = (feature) => {
    console.info(`${feature} clicked (demo mode)`);
  };

  const overviewStats = [
    {
      title: 'Total Citations',
      value: '1,247',
      change: '+23%',
      trend: 'up',
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Paper Views',
      value: '8,934',
      change: '+15%',
      trend: 'up',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Downloads',
      value: '3,456',
      change: '+8%',
      trend: 'up',
      icon: Download,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Collaborations',
      value: '28',
      change: '-2%',
      trend: 'down',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const topPapers = [
    {
      title: 'Machine Learning Applications in Climate Research',
      citations: 156,
      views: 2340,
      downloads: 890,
      impact: 'Very High',
      journal: 'Nature Climate Change'
    },
    {
      title: 'Quantum Computing Algorithms for Optimization',
      citations: 89,
      views: 1876,
      downloads: 567,
      impact: 'High',
      journal: 'Science'
    },
    {
      title: 'Neural Networks in Medical Diagnosis',
      citations: 67,
      views: 1234,
      downloads: 445,
      impact: 'High',
      journal: 'Medical AI Journal'
    },
    {
      title: 'Sustainable Energy Systems Analysis',
      citations: 45,
      views: 987,
      downloads: 234,
      impact: 'Medium',
      journal: 'Energy Policy'
    }
  ];

  const citationTrends = [
    { month: 'Jul', citations: 45 },
    { month: 'Aug', citations: 52 },
    { month: 'Sep', citations: 67 },
    { month: 'Oct', citations: 78 },
    { month: 'Nov', citations: 89 },
    { month: 'Dec', citations: 95 },
    { month: 'Jan', citations: 112 }
  ];

  const geographicData = [
    { country: 'United States', percentage: 35, color: 'bg-blue-500' },
    { country: 'United Kingdom', percentage: 18, color: 'bg-purple-500' },
    { country: 'Germany', percentage: 12, color: 'bg-green-500' },
    { country: 'China', percentage: 15, color: 'bg-yellow-500' },
    { country: 'Canada', percentage: 8, color: 'bg-red-500' },
    { country: 'Others', percentage: 12, color: 'bg-gray-500' }
  ];

  const collaborationMetrics = [
    { metric: 'Active Collaborations', value: 12, target: 15, percentage: 80 },
    { metric: 'International Partners', value: 8, target: 10, percentage: 80 },
    { metric: 'Cross-Disciplinary Projects', value: 5, target: 8, percentage: 62.5 },
    { metric: 'Joint Publications', value: 18, target: 20, percentage: 90 }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High': return 'text-red-400 bg-red-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const timeRanges = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Analytics — ResearchHub :: Academic Platform</title>
      </Helmet>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Research Analytics</h1>
          <p className="text-gray-400 mt-2">Track your research impact and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value} className="bg-gray-800">
                {range.label}
              </option>
            ))}
          </select>
          <Button
            onClick={() => handleFeatureClick('Export Report')}
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="research-card rounded-2xl p-6 hover:collaboration-glow transition-all cursor-pointer"
            onClick={() => handleFeatureClick(stat.title)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citation Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Citation Trends
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeatureClick('Citation Details')}
            >
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {citationTrends.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <span className="text-sm text-gray-400 w-8">{data.month}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-3 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.citations / 120) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                  ></motion.div>
                </div>
                <span className="text-sm font-medium text-white w-8">{data.citations}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Geographic Reach
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeatureClick('Geographic Details')}
            >
              View Map
            </Button>
          </div>
          <div className="space-y-4">
            {geographicData.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${country.color}`}></div>
                  <span className="text-sm text-gray-300">{country.country}</span>
                </div>
                <span className="text-sm font-medium text-white">{country.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Performing Papers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Top Performing Papers
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFeatureClick('All Papers Analytics')}
          >
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Paper</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Journal</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Citations</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Views</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Downloads</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Impact</th>
              </tr>
            </thead>
            <tbody>
              {topPapers.map((paper, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleFeatureClick('Paper Analytics')}
                >
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-white truncate">{paper.title}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-400">{paper.journal}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-white">{paper.citations}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-400">{paper.views}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-400">{paper.downloads}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(paper.impact)}`}>
                      {paper.impact}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Collaboration Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Collaboration Goals
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFeatureClick('Set Goals')}
          >
            Set Goals
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collaborationMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="research-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white">{metric.metric}</h3>
                <span className="text-sm text-gray-400">{metric.value}/{metric.target}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percentage}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-400">{metric.percentage}% of target achieved</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
