// common/csvManager.js

// Parse CSV text into headers array and data array of objects.
export function parseCSV(text) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(l => l);
  if (!lines.length) return { headers: [], data: [] };
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(ln => {
    const vals = ln.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return obj;
  });
  return { headers, data };
}

// Generate CSV text from headers array and data array of objects.
export function generateCSV(headers, data) {
  const lines = [headers.join(',')];
  data.forEach(row => {
    lines.push(headers.map(h => row[h] || '').join(','));
  });
  return lines.join('\n');
}

// Render a preview form into container, based on layout definitions.
// layout: array of { field, label, type, readonly }
// initialValues: object mapping field -> value (optional)
export function renderPreviewForm(layout, container, initialValues = {}) {
  container.innerHTML = '';
  const form = document.createElement('form');
  form.id = 'previewForm';
  layout.forEach(def => {
    const group = document.createElement('div');
    group.className = 'form-group';
    const label = document.createElement('label');
    label.textContent = def.label;
    const input = document.createElement('input');
    input.name = def.field;
    input.type = def.type || 'text';
    input.className = 'form-control';
    if (def.readonly) input.readOnly = true;
    if (initialValues[def.field] != null) input.value = initialValues[def.field];
    group.append(label, input);
    form.appendChild(group);
  });
  container.appendChild(form);
  return form;
}