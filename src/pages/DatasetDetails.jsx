import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatasetLinkedItems from '@/components/DatasetLinkedItems';

const DatasetDetails = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const API_BASE = import.meta.env.DEV ? 'http://localhost:4000' : '';
        const res = await fetch(`${API_BASE}/api/datasets/${id}`);
        if (!res.ok) throw new Error('Failed to fetch dataset');
        const data = await res.json();
        setDataset(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataset();
  }, [id]);

  if (loading) return <p>Loading dataset...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!dataset) return <p className="text-gray-400">Dataset not found.</p>;

  const latestVersion = (dataset.versions && dataset.versions.length > 0) ? dataset.versions[dataset.versions.length - 1] : null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{dataset.title}</h1>
          {latestVersion && (
            <span className="inline-block text-xs bg-green-600/30 px-2 py-1 rounded mt-2">{latestVersion.version} {latestVersion.status ? `(${latestVersion.status})` : ''}</span>
          )}
        </div>

        <div className="space-x-2">
          <button className="btn">📥 Download Dataset</button>
          <button className="btn">⬆️ Upload New Version</button>
          <button className="btn">⚙️ Run Automation...</button>
        </div>
      </div>

      {/* Metadata block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg">
        <div>
          <div className="text-sm text-gray-400">Uploader</div>
          <div className="font-medium">{dataset.uploader ? dataset.uploader.username : 'Unknown'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Upload Date</div>
          <div className="font-medium">{latestVersion && latestVersion.uploadedAt ? new Date(latestVersion.uploadedAt).toLocaleDateString() : (dataset.createdAt ? new Date(dataset.createdAt).toLocaleDateString() : '')}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">File Type</div>
          <div className="font-medium">{latestVersion && latestVersion.file ? latestVersion.file.mime : '—'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">File Size</div>
          <div className="font-medium">{latestVersion && latestVersion.file ? `${(latestVersion.file.size || 0) / (1024*1024) | 0} MB` : '—'}</div>
        </div>
      </div>

      {/* Description */}
      {dataset.description && (
        <div className="mt-4 p-4 bg-white/3 rounded">
          <h3 className="font-semibold">Description</h3>
          <p className="text-sm text-gray-300 mt-2">{dataset.description}</p>
        </div>
      )}

      {/* Linked Items */}
      <DatasetLinkedItems dataset={dataset} />
    </div>
  );
};

export default DatasetDetails;
