import express from 'express';
import Notebook from '../models/Notebook.js';

const router = express.Router();

// Return a notebook from DB if present, otherwise send a demo placeholder.
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Notebook.findById(id).lean();
    if (doc) return res.json(doc);
  } catch (err) {
    // ignore and fall through to demo
  }

  const demo = {
    id,
    title: `Notebook ${id}`,
    metadata: {
      description: 'Demo notebook placeholder. Implement a backend /api/notebooks/:id to return real notebook content.'
    },
    content: {
      cells: [
        { type: 'markdown', value: `# Notebook ${id}\n\nThis is a demo placeholder for notebook **${id}**.` },
        { type: 'code', language: 'python', value: "print('Hello from demo notebook')" }
      ]
    }
  };

  res.json(demo);
});

export default router;
