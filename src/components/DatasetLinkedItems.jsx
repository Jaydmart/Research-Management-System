import React, { useState } from 'react';

const TabButton = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t-lg border-b-2 ${active ? 'border-blue-400 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
  >
    {label} {typeof count === 'number' ? `(${count})` : ''}
  </button>
);

const DatasetLinkedItems = ({ dataset }) => {
  const [tab, setTab] = useState('experiments');

  const experiments = dataset.linkedNotebookEntries || [];
  const lineage = dataset.lineage || [];
  const citations = dataset.citedInPapers || [];

  return (
    <div className="mt-6 bg-white/5 p-4 rounded-lg">
      <div className="flex border-b border-white/10 -mx-4 px-4">
        <TabButton label="Used in Experiments" count={experiments.length} active={tab === 'experiments'} onClick={() => setTab('experiments')} />
        <TabButton label="Data Lineage" count={lineage.length} active={tab === 'lineage'} onClick={() => setTab('lineage')} />
        <TabButton label="Cited in Papers" count={citations.length} active={tab === 'citations'} onClick={() => setTab('citations')} />
      </div>

      <div className="mt-4">
        {tab === 'experiments' && (
          <div className="space-y-3">
            {experiments.length === 0 && <p className="text-sm text-gray-400">No experiments linked to this dataset.</p>}
            {experiments.map((e, idx) => (
              <div key={idx} className="p-3 bg-white/2 rounded">
                <a className="text-sm font-medium text-blue-300" href={e.refId ? `/notebooks/${e.refId}` : '#'}>{e.title}</a>
                {e.refId && <div className="text-xs text-gray-400">Entry #{e.refId}</div>}
              </div>
            ))}
          </div>
        )}

        {tab === 'lineage' && (
          <div className="space-y-3">
            {lineage.length === 0 && <p className="text-sm text-gray-400">No lineage records for this dataset.</p>}
            {lineage.map((l, idx) => (
              <div key={idx} className="p-3 bg-white/2 rounded">
                <div className="text-sm">{l.description || `${l.script || 'Script'} (generated)`}</div>
                {l.sourceDataset && <a className="text-xs text-blue-300" href={`/datasets/${l.sourceDataset._id}`}>{l.sourceDataset.title}</a>}
                <div className="text-xs text-gray-400">{l.createdAt ? new Date(l.createdAt).toLocaleString() : ''}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'citations' && (
          <div className="space-y-3">
            {citations.length === 0 && <p className="text-sm text-gray-400">No papers cite this dataset.</p>}
            {citations.map((c, idx) => (
              <div key={idx} className="p-3 bg-white/2 rounded flex items-center justify-between">
                <div>
                  <a className="text-sm font-medium text-blue-300" href={c.paperId ? `/papers/${c.paperId._id}` : '#'}>{c.title}</a>
                  <div className="text-xs text-gray-400">Status: {c.status || 'Unknown'}</div>
                </div>
                <div className="text-xs text-gray-500">{c.citedAt ? new Date(c.citedAt).toLocaleDateString() : ''}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetLinkedItems;
