import express from 'express';
import Dataset from '../models/Dataset.js';
import Paper from '../models/Paper.js';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const router = express.Router();

// Ensure upload directory exists
const UPLOAD_BASE = path.resolve('backend', 'uploads', 'datasets');
fs.mkdirSync(UPLOAD_BASE, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_BASE);
  },
  filename: function (req, file, cb) {
    const safe = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safe);
  }
});

// 5GB limit (demo) - set lower in constrained environments
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 * 1024 } });

// GET /api/datasets - list all datasets (basic)
router.get('/', async (req, res) => {
  try {
    const { project, tag, q } = req.query;
    const filter = {};
    if (project) filter.project = project;
    if (tag) filter.tags = tag;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const datasets = await Dataset.find(filter).select('title project tags uploader versions createdAt');
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/datasets - create a new dataset (metadata only)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const ds = new Dataset(data);
    await ds.save();
    res.status(201).json(ds);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/datasets/upload - DEMO MODE (no file saved, no DB writes)
// This route intentionally ignores file uploads and simulates a successful response so the frontend UX can demo quickly.
router.post('/upload', async (req, res) => {
  try {
    // Log harmless text for debugging/demo purposes (may be empty if multipart not parsed)
    console.log(`DEMO MODE: "Upload" received for: ${req.body?.title || '(no title sent)'}`);

    // Simulate processing delay
    setTimeout(() => {
      // Return the seeded dataset id so the frontend redirects to the populated dataset details page
      res.status(201).json({ _id: '690827f4ca49fbe1ad7d7ceb' });
    }, 1000);
  } catch (err) {
    console.error('Demo upload error', err);
    res.status(500).json({ error: 'Demo upload failed' });
  }
});

// GET /api/datasets/:id - get dataset details including cited papers
router.get('/:id', async (req, res) => {
  try {
    const ds = await Dataset.findById(req.params.id)
      .populate('uploader', 'username email')
      .populate('versions.uploader', 'username email')
      .populate('lineage.sourceDataset', 'title')
      .populate('citedInPapers.paperId', 'title');

    if (!ds) return res.status(404).json({ error: 'Dataset not found' });
    res.json(ds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/datasets/:id/versions - add a version (metadata only)
router.post('/:id/versions', async (req, res) => {
  try {
    const { version, status, file, uploader } = req.body;
    const ds = await Dataset.findById(req.params.id);
    if (!ds) return res.status(404).json({ error: 'Dataset not found' });
    ds.versions.push({ version, status, file, uploader });
    await ds.save();
    res.status(201).json(ds);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/datasets/:id/link-paper - link an existing paper as a citation
// body: { paperId }
router.post('/:id/link-paper', async (req, res) => {
  try {
    const { paperId } = req.body;
    const ds = await Dataset.findById(req.params.id);
    if (!ds) return res.status(404).json({ error: 'Dataset not found' });

    let paper = null;
    if (paperId) {
      paper = await Paper.findById(paperId);
    }

    const citation = {
      title: paper ? paper.title : (req.body.title || 'Unknown'),
      paperId: paper ? paper._id : undefined,
      status: req.body.status || (paper ? (paper.status || 'Published') : 'Unknown')
    };

    ds.citedInPapers.push(citation);
    await ds.save();
    res.status(201).json(ds.citedInPapers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/datasets/:id/citations - return cited papers for a dataset
router.get('/:id/citations', async (req, res) => {
  try {
    const ds = await Dataset.findById(req.params.id).populate('citedInPapers.paperId', 'title');
    if (!ds) return res.status(404).json({ error: 'Dataset not found' });
    res.json(ds.citedInPapers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
