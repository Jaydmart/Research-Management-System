import mongoose from 'mongoose';

const NotebookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  metadata: {
    description: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  },
  content: { type: Object }, // store notebook JSON (e.g., Jupyter .ipynb structure) or a simplified representation
}, { timestamps: true });

const Notebook = mongoose.model('Notebook', NotebookSchema);

export default Notebook;
