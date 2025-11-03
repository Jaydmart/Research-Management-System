
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Star, 
  Download, 
  Eye, 
  Edit,
  Trash2,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Papers = () => {
  // Demo: disable popup toasts
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    console.info(`${feature} clicked (demo mode)`);
  };

  const papers = [
    {
      id: 1,
      title: 'Machine Learning Applications in Climate Research: A Comprehensive Analysis',
      authors: ['Dr. Sarah Smith', 'Dr. Michael Johnson', 'Dr. Emily Chen'],
      status: 'Published',
      journal: 'Nature Climate Change',
      date: '2024-01-15',
      citations: 23,
      downloads: 145,
      tags: ['Machine Learning', 'Climate', 'Data Analysis'],
      abstract: 'This paper explores the application of machine learning techniques in climate research...',
      impact: 'High'
    },
    {
      id: 2,
      title: 'Quantum Computing Algorithms for Complex Optimization Problems',
      authors: ['Dr. Robert Chen', 'Dr. Lisa Williams'],
      status: 'Under Review',
      journal: 'Science',
      date: '2024-01-10',
      citations: 67,
      downloads: 289,
      tags: ['Quantum Computing', 'Algorithms', 'Optimization'],
      abstract: 'We present novel quantum algorithms for solving complex optimization problems...',
      impact: 'Very High'
    },
    {
      id: 3,
      title: 'Sustainable Energy Systems: A Multi-Criteria Analysis Framework',
      authors: ['Dr. James Brown', 'Dr. Maria Davis', 'Dr. Alex Wilson'],
      status: 'Draft',
      journal: 'Energy Policy',
      date: '2024-01-08',
      citations: 12,
      downloads: 78,
      tags: ['Sustainability', 'Energy', 'Policy'],
      abstract: 'This study develops a comprehensive framework for analyzing sustainable energy systems...',
      impact: 'Medium'
    },
    {
      id: 4,
      title: 'Neural Networks in Medical Diagnosis: Recent Advances and Applications',
      authors: ['Dr. Jennifer Lee', 'Dr. David Kim'],
      status: 'Published',
      journal: 'Medical AI Journal',
      date: '2023-12-20',
      citations: 89,
      downloads: 456,
      tags: ['Neural Networks', 'Medical', 'AI'],
      abstract: 'Recent advances in neural networks have revolutionized medical diagnosis...',
      impact: 'High'
    },
    {
      id: 5,
      title: 'Blockchain Technology in Supply Chain Management',
      authors: ['Dr. Thomas Anderson', 'Dr. Rachel Green'],
      status: 'Submitted',
      journal: 'Supply Chain Review',
      date: '2024-01-05',
      citations: 5,
      downloads: 34,
      tags: ['Blockchain', 'Supply Chain', 'Technology'],
      abstract: 'This paper examines the implementation of blockchain technology in supply chain management...',
      impact: 'Medium'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Papers', count: papers.length },
    { value: 'published', label: 'Published', count: papers.filter(p => p.status === 'Published').length },
    { value: 'review', label: 'Under Review', count: papers.filter(p => p.status === 'Under Review').length },
    { value: 'draft', label: 'Draft', count: papers.filter(p => p.status === 'Draft').length },
    { value: 'submitted', label: 'Submitted', count: papers.filter(p => p.status === 'Submitted').length }
  ];

  const filteredPapers = papers.filter(paper => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'published' && paper.status === 'Published') ||
      (selectedFilter === 'review' && paper.status === 'Under Review') ||
      (selectedFilter === 'draft' && paper.status === 'Draft') ||
      (selectedFilter === 'submitted' && paper.status === 'Submitted');
    
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Under Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Submitted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Research Papers</h1>
          <p className="text-gray-400 mt-2">Manage and organize your academic publications</p>
        </div>
        <Button
          onClick={() => handleFeatureClick('New Paper')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Paper
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-6 border border-white/10"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search papers, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === option.value
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPapers.map((paper, index) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="research-card rounded-2xl p-6 hover:collaboration-glow transition-all cursor-pointer group"
            onClick={() => handleFeatureClick('Paper Details')}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {paper.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-400">{paper.authors.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{paper.date}</span>
                  </div>
                  <span>•</span>
                  <span>{paper.journal}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(paper.status)}`}>
                {paper.status}
              </span>
            </div>

            {/* Abstract */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {paper.abstract}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {paper.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded-lg flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
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
                  <span className="text-xs">Impact:</span>
                  <span className={`text-xs font-medium ${getImpactColor(paper.impact)}`}>
                    {paper.impact}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick('View Paper');
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick('Edit Paper');
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick('Delete Paper');
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPapers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No papers found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <Button
            onClick={() => handleFeatureClick('New Paper')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Paper
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Papers;
