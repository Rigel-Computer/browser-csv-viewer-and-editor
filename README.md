# browser-csv-viewer-and-editor

A lightweight CSV viewer and editor that runs entirely in your browser. No server, no installation, no Excel required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML](https://img.shields.io/badge/no%20build%20step-just%20open-orange.svg)

---

## Features

- **Drag & drop** or file picker to load any CSV / TSV file
- **Column sorting** — click any header to sort ascending/descending
- **Live search / filter** across all columns simultaneously
- **Inconsistency highlighting** — automatically flags:
  - 🔴 Empty, null, N/A, or blank cells
  - 🟡 Text values in otherwise numeric columns
  - 🟡 Negative values in amount/price/total columns
  - 🟡 Unparseable dates in date columns
- **Inline cell editing** — click any cell to edit it directly
- **Export** the modified data back to a CSV file
- **Dark / Light theme** — toggle in the header, preference is remembered
- **New file** button — return to the start screen without reloading the page

## Usage

1. Download or clone the repo
2. Open `index.html` in any modern browser
3. Drop your CSV onto the page — that's it

No build step, no npm, no backend.

## Files

| File | Description |
|---|---|
| `index.html` | HTML shell — markup only |
| `style.css` | All styles, CSS custom-property theming (dark + light) |
| `app.js` | All logic — state, events, render, export |

All three files must live in the same directory.

## Inconsistency Detection

Simple heuristics spot potential data issues at a glance:

| Highlight | Meaning |
|---|---|
| 🔴 Red cell | Empty, `null`, `N/A`, or `-` value |
| 🟡 Yellow cell | Text in a column where >70 % of values are numeric |
| 🟡 Yellow cell | Negative number in a column named *amount*, *price*, *total*, *cost*, *revenue*, or *sum* |
| 🟡 Yellow cell | Unparseable value in a column named *date*, *time*, *created*, or *updated* |

Highlighting can be toggled on/off with the **Inconsistencies** button in the toolbar.

## Dependencies

- [PapaParse 5.4](https://www.papaparse.com/) — loaded from cdnjs, used for CSV parsing and export

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No Internet Explorer support.

## License

MIT — do whatever you want with it.
