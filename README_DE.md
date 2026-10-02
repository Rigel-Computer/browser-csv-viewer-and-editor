# browser-csv-viewer-and-editor

Ein schlanker CSV-Viewer und -Editor, der vollständig im Browser läuft. Kein Server, keine Installation, kein Excel erforderlich.

![Lizenz](https://img.shields.io/badge/lizenz-MIT-blue.svg)
![HTML](https://img.shields.io/badge/kein%20Build-einfach%20öffnen-orange.svg)

---

## Funktionen

- **Drag & Drop** oder Dateiauswahl für beliebige CSV- / TSV-Dateien
- **Spalten sortieren** — Klick auf einen Spaltenkopf sortiert auf- oder absteigend
- **Live-Suche / Filter** über alle Spalten gleichzeitig
- **Inkonsistenz-Highlighting** — markiert automatisch:
  - 🔴 Leere, null, N/A oder leere Zellen
  - 🟡 Textwerte in sonst numerischen Spalten
  - 🟡 Negative Werte in Betrags-/Preis-/Summen-Spalten
  - 🟡 Ungültige Datumsangaben in Datumsspalten
- **Zellen direkt bearbeiten** — einfach in eine Zelle klicken
- **Export** der bearbeiteten Daten als neue CSV-Datei
- **Dark- / Light-Theme** — Schalter im Header, Einstellung wird gespeichert
- **Neue Datei**-Button — zurück zur Startseite ohne Seite neu laden

## Verwendung

1. Repo herunterladen oder klonen
2. `index.html` in einem modernen Browser öffnen
3. CSV per Drag & Drop auf die Seite ziehen — fertig

Kein Build-Schritt, kein npm, kein Backend.

## Dateien

| Datei | Beschreibung |
|---|---|
| `index.html` | HTML-Gerüst — nur Markup |
| `style.css` | Alle Styles, CSS-Custom-Properties für Dark- und Light-Theme |
| `app.js` | Gesamte Logik — State, Events, Rendering, Export |

Alle drei Dateien müssen im selben Verzeichnis liegen.

## Inkonsistenz-Erkennung

Einfache Heuristiken zeigen potenzielle Datenfehler auf einen Blick:

| Markierung | Bedeutung |
|---|---|
| 🔴 Rote Zelle | Leerer Wert, `null`, `N/A` oder `-` |
| 🟡 Gelbe Zelle | Text in einer Spalte, in der >70 % der Werte numerisch sind |
| 🟡 Gelbe Zelle | Negativer Betrag in einer Spalte namens *amount*, *price*, *total*, *betrag*, *summe*, *preis* o. Ä. |
| 🟡 Gelbe Zelle | Ungültiger Wert in einer Spalte namens *date*, *datum*, *time*, *created*, *updated* o. Ä. |

Das Highlighting lässt sich mit dem Button **Inkonsistenzen** in der Toolbar ein- und ausschalten.

## Abhängigkeiten

- [PapaParse 5.4](https://www.papaparse.com/) — wird von cdnjs geladen, dient zum Parsen und Exportieren von CSV-Dateien

## Browser-Unterstützung

Funktioniert in allen modernen Browsern (Chrome, Firefox, Safari, Edge). Internet Explorer wird nicht unterstützt.

## Lizenz

MIT — mach damit, was du willst.
