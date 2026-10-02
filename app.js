/* ── State ── */
let allData     = [];
let headers     = [];
let filteredRows = [];
let sortCol     = -1;
let sortDir     = 1;
let highlightOn = true;
let currentFile = '';

/* ── Theme ─────────────────────────────────────────────────────── */
const htmlEl = document.documentElement;
setTheme(localStorage.getItem('csvviewer-theme') || 'dark', false);

function setTheme(t, save = true) {
  htmlEl.setAttribute('data-theme', t);
  document.getElementById('themeIcon').textContent  = t === 'dark' ? '☀️' : '🌙';
  document.getElementById('themeLabel').textContent = t === 'dark' ? 'Light' : 'Dark';
  if (save) localStorage.setItem('csvviewer-theme', t);
}

function toggleTheme() {
  setTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

/* ── Drag & Drop / File input ───────────────────────────────────── */
const dz = document.getElementById('dropzone');
dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('over'); });
dz.addEventListener('dragleave', ()  => dz.classList.remove('over'));
dz.addEventListener('drop', e => {
  e.preventDefault();
  dz.classList.remove('over');
  handleFile(e.dataTransfer.files[0]);
});
document.getElementById('fileInput').addEventListener('change', e => handleFile(e.target.files[0]));

function handleFile(file) {
  if (!file) return;
  currentFile = file.name;
  document.getElementById('filename').textContent = file.name;
  setStatus('Loading ' + file.name + ' …');

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete(res) {
      headers      = res.meta.fields;
      allData      = res.data;
      filteredRows = [...allData];

      show('toolbar');
      show('tableWrapper');
      show('reloadBtn');
      hide('dropzone');

      renderTable();
      setStatus('Loaded: ' + allData.length + ' rows, ' + headers.length + ' columns');
    },
    error(err) { setStatus('Error: ' + err.message); }
  });
}

/* ── Search / Filter ────────────────────────────────────────────── */
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  filteredRows = q
    ? allData.filter(row => headers.some(h => String(row[h]).toLowerCase().includes(q)))
    : [...allData];
  if (sortCol >= 0) sortBy(sortCol, false);
  else renderTable();
});

/* ── Highlight toggle ───────────────────────────────────────────── */
function toggleHighlight() {
  highlightOn = !highlightOn;
  document.getElementById('hlBtn').textContent = highlightOn ? '🔍 Inconsistencies' : '○ Inconsistencies';
  renderTable();
}

/* ── Sort ───────────────────────────────────────────────────────── */
function resetSort() {
  sortCol = -1; sortDir = 1;
  const q = document.getElementById('searchInput').value.toLowerCase();
  filteredRows = q
    ? allData.filter(row => headers.some(h => String(row[h]).toLowerCase().includes(q)))
    : [...allData];
  renderTable();
}

function sortBy(colIdx, toggle = true) {
  if (toggle) {
    sortDir = (sortCol === colIdx) ? sortDir * -1 : 1;
    sortCol = colIdx;
  }
  const h = headers[colIdx];
  filteredRows.sort((a, b) => {
    const an = parseFloat(a[h]), bn = parseFloat(b[h]);
    return (!isNaN(an) && !isNaN(bn))
      ? (an - bn) * sortDir
      : String(a[h]).localeCompare(String(b[h])) * sortDir;
  });
  renderTable();
}

/* ── Inconsistency classifier ───────────────────────────────────── */
function classify(val, header, colVals) {
  if (val === '' || val === null || val === undefined) return 'empty';
  const s = String(val).trim();
  if (!s || s === '-' || s.toLowerCase() === 'null' || s.toLowerCase() === 'n/a') return 'empty';

  // Numeric column heuristic (>70 % of non-empty values are numbers)
  const nonEmpty     = colVals.filter(v => v !== '');
  const numericCount = nonEmpty.filter(v => !isNaN(parseFloat(v))).length;
  if (nonEmpty.length > 0 && numericCount / nonEmpty.length > 0.7 && isNaN(parseFloat(s)))
    return 'suspect';

  const lh = header.toLowerCase();

  // Negative value in an amount-like column
  const isAmount = ['amount','total','price','sum','revenue','cost'].some(k => lh.includes(k));
  if (isAmount && parseFloat(s) < 0) return 'suspect';

  // Invalid date in a date-like column
  const isDate = ['date','time','created','updated'].some(k => lh.includes(k));
  if (isDate && isNaN(Date.parse(s))) return 'suspect';

  return '';
}

/* ── Render table ───────────────────────────────────────────────── */
function renderTable() {
  const wrapper = document.getElementById('tableWrapper');

  // Pre-collect column values for the classifier
  const colVals = {};
  headers.forEach(h => { colVals[h] = filteredRows.map(r => String(r[h] ?? '')); });

  let warns = 0, errs = 0;
  let out = '<table><thead><tr><th class="rn">#</th>';

  headers.forEach((h, i) => {
    const sorted = sortCol === i;
    const icon   = sorted ? (sortDir === 1 ? '▲' : '▼') : '⇅';
    out += `<th class="${sorted ? 'sorted' : ''}" onclick="sortBy(${i})">${h}<span class="sort-icon">${icon}</span></th>`;
  });
  out += '</tr></thead><tbody>';

  filteredRows.forEach((row, ri) => {
    out += `<tr><td class="rn">${ri + 1}</td>`;
    headers.forEach(h => {
      const val = row[h] ?? '';
      let cls   = '';
      if (highlightOn) {
        cls = classify(val, h, colVals[h]);
        if (cls === 'empty')   errs++;
        if (cls === 'suspect') warns++;
      }
      const safe = String(val)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;')
        .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      out += `<td class="${cls}" contenteditable="true" data-row="${ri}" data-col="${h}" onblur="cellEdit(this)">${safe}</td>`;
    });
    out += '</tr>';
  });

  out += '</tbody></table>';
  wrapper.innerHTML = out;

  document.getElementById('rowCount').textContent = filteredRows.length + ' rows';
  document.getElementById('warnCount').textContent = (highlightOn && warns) ? `⚠ ${warns} suspect`   : '';
  document.getElementById('errCount').textContent  = (highlightOn && errs)  ? `✗ ${errs} empty/null` : '';
}

/* ── Inline cell edit ───────────────────────────────────────────── */
function cellEdit(td) {
  const ri  = parseInt(td.dataset.row);
  const h   = td.dataset.col;
  const val = td.innerText.trim();

  filteredRows[ri][h] = val;
  const orig = allData.find(r => r === filteredRows[ri]);
  if (orig) orig[h] = val;

  if (highlightOn) {
    const colVals = filteredRows.map(r => String(r[h] ?? ''));
    td.className  = classify(val, h, colVals) || '';
  }
}

/* ── Export ─────────────────────────────────────────────────────── */
function exportCSV() {
  const csv  = Papa.unparse({ fields: headers, data: allData });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href:     url,
    download: currentFile ? 'edited_' + currentFile : 'export.csv'
  });
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Reset to start screen ──────────────────────────────────────── */
function resetAll() {
  allData = []; headers = []; filteredRows = [];
  sortCol = -1; sortDir = 1; highlightOn = true; currentFile = '';

  document.getElementById('filename').textContent    = 'no file loaded';
  document.getElementById('searchInput').value       = '';
  document.getElementById('hlBtn').textContent       = '🔍 Inconsistencies';
  document.getElementById('tableWrapper').innerHTML  = '';
  document.getElementById('fileInput').value         = '';

  hide('tableWrapper');
  hide('toolbar');
  hide('reloadBtn');
  show('dropzone');
  setStatus('Ready – load a CSV file to get started');
}

/* ── Helpers ────────────────────────────────────────────────────── */
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }
function setStatus(msg) { document.getElementById('status').textContent = msg; }
