import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UploadDataset = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [mode, setMode] = useState('new');
  const [datasetId, setDatasetId] = useState('');
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  useEffect(() => {
    // load existing datasets for version uploads
    const fetchDatasets = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/datasets`);
        const data = await res.json();
        setDatasets(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDatasets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to upload');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('mode', mode);
      fd.append('title', title);
      fd.append('description', description);
      fd.append('tags', tags);
      fd.append('version', 'v' + (new Date().getTime()));
      if (mode === 'version') fd.append('datasetId', datasetId);

      const res = await fetch(`${API_BASE}/api/datasets/upload`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      // redirect to dataset details
      navigate(`/datasets/${data._id}`);
    } catch (err) {
      console.error(err);
      alert('Upload error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Upload Dataset — ResearchHub :: Academic Platform</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Upload New Dataset</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">File</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <p className="text-xs text-gray-400">Upload your .csv, .gz, .zip, or other data file. Max size: 5GB.</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="w-full p-2 bg-white/5 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Genomic Sequence Data - Project Q" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full p-2 bg-white/5 rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Raw output from the Illumina sequencer for batch 2."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input className="w-full p-2 bg-white/5 rounded" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g., Genomics, Raw Data, Project Q" />
        </div>

        <div>
          <label className="block text-sm font-medium">Versioning</label>
          <div className="space-x-4 mt-2">
            <label><input type="radio" name="mode" value="new" checked={mode === 'new'} onChange={() => setMode('new')} /> Create New Dataset</label>
            <label><input type="radio" name="mode" value="version" checked={mode === 'version'} onChange={() => setMode('version')} /> Upload New Version of Existing Dataset</label>
          </div>
          {mode === 'version' && (
            <div className="mt-2">
              <label className="block text-sm">Select Dataset</label>
              <select className="w-full p-2 bg-white/5 rounded" value={datasetId} onChange={e => setDatasetId(e.target.value)}>
                <option value="">-- Select --</option>
                {datasets.map(d => <option key={d._id} value={d._id}>{d.title}</option>)}
              </select>
            </div>
          )}
        </div>

        <div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Uploading...' : 'Upload and Process Dataset'}</button>
        </div>
      </form>
    </div>
  );
};

export default UploadDataset;
