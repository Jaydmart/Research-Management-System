import mongoose from "mongoose";

const VersionSchema = new mongoose.Schema({
  version: { type: String }, // e.g. v2.1
  status: { type: String }, // e.g. 'Validated'
  file: {
    path: String,
    size: Number,
    mime: String,
    checksum: String
  },
  uploadedAt: { type: Date, default: Date.now },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const LinkedEntrySchema = new mongoose.Schema({
  title: String,
  refType: { type: String }, // e.g. 'NotebookEntry'
  refId: mongoose.Schema.Types.ObjectId
});

const LineageSchema = new mongoose.Schema({
  description: String,
  script: String,
  sourceDataset: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset' },
  params: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

const CitedPaperSchema = new mongoose.Schema({
  title: String,
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  status: String, // e.g. 'Published' | 'In Review'
  citedAt: { type: Date, default: Date.now }
});

const DatasetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  project: { type: String },
  versions: [VersionSchema],
  linkedNotebookEntries: [LinkedEntrySchema],
  lineage: [LineageSchema],
  citedInPapers: [CitedPaperSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

DatasetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Dataset', DatasetSchema);
