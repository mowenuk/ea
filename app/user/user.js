import { parseCSV, renderPreviewForm, generateCSV } from '../common/csvManager.js';

// load currentLayout from selected metamodel via API
// maintain instances[], nextId
// on Add: read previewForm values into new instance and refresh list
// on Save: generateCSV and download or POST