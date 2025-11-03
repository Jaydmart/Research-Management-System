import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
// highlight.js stylesheet for code block styling (dark theme)
import 'highlight.js/styles/github-dark.css';

const Notebook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchNotebook = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
        const res = await fetch(`${API_BASE}/api/notebooks/${id}`);
        if (!res.ok) {
          // backend may not implement notebooks yet - handle gracefully
          throw new Error(`Notebook fetch failed: ${res.status}`);
        }
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchNotebook();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-6">Loading notebook...</div>;

  if (error) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-bold">Notebook</h1>
        <p className="text-sm text-gray-300">Could not load notebook <strong>{id}</strong>.</p>
        <p className="text-sm text-gray-400">Reason: {error}</p>
        <p className="text-sm">This project currently seeds notebook references but does not store full notebook entries in the backend. You can:</p>
        <ul className="list-disc ml-6 text-sm text-gray-400">
          <li>Implement a backend `/api/notebooks/:id` endpoint that returns notebook content/metadata.</li>
          <li>Or attach a notebook link on the dataset and view it externally.</li>
        </ul>
        <Link to="/datasets" className="text-blue-400 underline">Back to datasets</Link>
      </div>
    );
  }

  // If backend returns something, render a simple viewer
  return (
    <div className="p-6">
      <Helmet>
        <title>{data && data.title ? `${data.title} — ResearchHub` : `Notebook ${id} — ResearchHub`}</title>
      </Helmet>
      <h1 className="text-2xl font-bold">{data.title || `Notebook ${id}`}</h1>
      {data.metadata && (
        <div className="mt-2 text-sm text-gray-400">{data.metadata.description}</div>
      )}

      <div className="mt-6 space-y-4">
        {data.content && Array.isArray(data.content.cells) && data.content.cells.map((cell, idx) => {
          if (cell.type === 'markdown') {
            return (
              <div key={idx} className="prose max-w-none text-white">
                <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]}>{cell.value}</ReactMarkdown>
              </div>
            );
          }
          if (cell.type === 'code') {
            return (
              <pre key={idx} className="notebook-code"><code>{cell.value}</code></pre>
            );
          }
          if (cell.type === 'output' && cell.subtype === 'image') {
            return (
              <figure key={idx} className="my-4">
                <img src={cell.src} alt={cell.caption || 'notebook-output'} className="w-full rounded border border-white/10" />
                {cell.caption && <figcaption className="text-sm text-gray-400 mt-2">{cell.caption}</figcaption>}
              </figure>
            );
          }
          // Fallback: show JSON for unknown cell types
          return (
            <pre key={idx} className="whitespace-pre-wrap text-sm bg-white/5 p-4 rounded">{JSON.stringify(cell, null, 2)}</pre>
          );
        })}
      </div>
      <Link to="/datasets" className="text-blue-400 underline mt-4 inline-block">Back to datasets</Link>
    </div>
  );
};

export default Notebook;
