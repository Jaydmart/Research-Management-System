import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const DataHub = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.DEV ? 'http://localhost:4000' : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/datasets`);
        const data = await res.json();
        setDatasets(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Data Hub — ResearchHub :: Academic Platform</title>
      </Helmet>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Project Data Hub</h1>
          <p className="text-gray-400 mt-2">Browse and manage your project datasets</p>
        </div>
        <div>
          <Button
            onClick={() => navigate('/datasets/upload')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Dataset
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading datasets...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map(ds => (
            <div key={ds._id} className="p-4 bg-white/5 rounded-lg border border-white/5">
              <h3 className="font-semibold text-lg">{ds.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{ds.project}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="space-x-2">
                  {(ds.tags || []).slice(0,3).map(tag => (
                    <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <Link to={`/datasets/${ds._id}`} className="text-sm text-blue-400">View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataHub;
