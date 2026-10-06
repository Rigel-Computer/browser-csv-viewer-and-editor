# browser-csv-viewer-and-editor

> **⚠️ This repository is no longer maintained.**
> Development continues in **[browser-csv-excel-viewer-and-editor](https://github.com/Rigel-Computer/browser-csv-excel-viewer-and-editor)**, which adds an Excel viewer (`.xlsx`, `.xls`, `.ods`) with much more precise inconsistency checks, works fully offline and blocks all network access from the page.
> This final version contains an important security fix (see [Final release](#final-release)). If you use an earlier copy, update or switch to the new repository.

**English** · [Deutsch](README_DE.md)

A lightweight CSV viewer and editor that runs entirely in your browser. No server, no installation, no Excel required.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-archived-lightgrey.svg)

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

## Security

- **Your data stays in the browser.** Files are read locally and never uploaded. The only network request is loading PapaParse from cdnjs when the page opens.
- **Crafted files cannot run code.** Headers and cell values are escaped before they are displayed.
- **Exports contain your data as it is.** If a CSV from someone else contains cells that start with `=`, Excel will treat them as formulas when you open the export, just as it would with the original.

For stricter requirements, use the [new repository](https://github.com/Rigel-Computer/browser-csv-excel-viewer-and-editor): it ships PapaParse locally, works without internet and blocks every network connection from the page.

## Final release

The last commit before archiving fixes a security issue:

- **Fixed: script injection through CSV headers.** Earlier versions inserted column headers into the page without escaping them. A crafted CSV file could therefore run its own script in the viewer and read the loaded data. Headers are now escaped like cell values.

## Dependencies

- [PapaParse 5.4.1](https://www.papaparse.com/) (MIT) — CSV parsing and export, loaded from cdnjs. No known vulnerabilities in this version.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No Internet Explorer support.

## License

MIT — do whatever you want with it.
