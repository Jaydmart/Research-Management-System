import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Data Hub</h2>
        <Link to="/datasets/upload" className="btn btn-primary">+ Upload Dataset</Link>
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
