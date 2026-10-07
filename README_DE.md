# browser-csv-viewer-and-editor

> **⚠️ Dieses Repository wird nicht mehr gepflegt.**
> Die Entwicklung geht weiter in **[browser-csv-excel-viewer-and-editor](https://github.com/Rigel-Computer/browser-csv-excel-viewer-and-editor)**, das zusätzlich einen Excel-Viewer (`.xlsx`, `.xls`, `.ods`) mit deutlich genauerer Inkonsistenz-Prüfung bietet, komplett offline läuft und jeden Netzwerkzugriff der Seite sperrt.
> Diese letzte Version enthält eine wichtige Sicherheitskorrektur (siehe [Letzte Version](#letzte-version)). Wer eine ältere Kopie nutzt, sollte aktualisieren oder zum neuen Repository wechseln.

[English](README.md) · **Deutsch**

Ein schlanker CSV-Viewer und -Editor, der vollständig im Browser läuft. Kein Server, keine Installation, kein Excel erforderlich.

![Lizenz](https://img.shields.io/badge/lizenz-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-archiviert-lightgrey.svg)

---

## Funktionen

- **Drag & Drop** oder Dateiauswahl für beliebige CSV- / TSV-Dateien
- **Spalten sortieren** — Klick auf einen Spaltenkopf sortiert auf- oder absteigend
- **Live-Suche / Filter** über alle Spalten gleichzeitig
- **Inkonsistenz-Highlighting** — markiert automatisch:
  - 🔴 Leere Zellen sowie null, N/A oder -
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
| 🟡 Gelbe Zelle | Negativer Betrag in einer Spalte namens *amount*, *price*, *total*, *cost*, *revenue* oder *sum* |
| 🟡 Gelbe Zelle | Ungültiger Wert in einer Spalte namens *date*, *time*, *created* oder *updated* |

Die Spaltenerkennung arbeitet nur mit englischen Überschriften. Das Highlighting lässt sich mit dem Button **Inconsistencies** in der Toolbar ein- und ausschalten.

## Sicherheit

- **Die Daten bleiben im Browser.** Dateien werden lokal gelesen und nie hochgeladen. Die einzige Netzwerkanfrage ist das Laden von PapaParse von cdnjs beim Öffnen der Seite.
- **Präparierte Dateien können keinen Code ausführen.** Überschriften und Zellwerte werden vor der Anzeige maskiert.
- **Exporte enthalten die Daten, wie sie sind.** Enthält eine fremde CSV Zellen, die mit `=` beginnen, behandelt Excel sie beim Öffnen des Exports als Formel, genau wie beim Original.

Für strengere Anforderungen das [neue Repository](https://github.com/Rigel-Computer/browser-csv-excel-viewer-and-editor) verwenden: Es liefert PapaParse lokal mit, läuft ohne Internet und sperrt jede Netzwerkverbindung der Seite.

## Letzte Version

Der letzte Commit vor der Archivierung behebt eine Sicherheitslücke:

- **Behoben: Skript-Einschleusung über CSV-Überschriften.** Frühere Versionen haben Spaltenüberschriften unmaskiert in die Seite geschrieben. Eine präparierte CSV-Datei konnte dadurch eigenen Code im Viewer ausführen und die geladenen Daten lesen. Überschriften werden jetzt wie Zellwerte maskiert.

## Abhängigkeiten

- [PapaParse 5.4.1](https://www.papaparse.com/) (MIT) — Parsen und Export von CSV, von cdnjs geladen. Keine bekannten Sicherheitslücken in dieser Version.

## Browser-Unterstützung

Funktioniert in allen modernen Browsern (Chrome, Firefox, Safari, Edge). Internet Explorer wird nicht unterstützt.

## Haftungsausschluss

Dieser Code wurde ganz oder teilweise mithilfe generativer KI (Claude von Anthropic) erstellt. Er wurde mit automatisierten Browser-Tests geprüft, auch mit absichtlich präparierten Dateien, aber nicht unabhängig begutachtet.

Die Software wird ohne jede Gewährleistung bereitgestellt (siehe [LICENSE](LICENSE)). **Die Nutzung erfolgt auf eigene Gefahr.** Vor dem Bearbeiten und Exportieren bitte immer eine Sicherungskopie der Datei anlegen. Die Inkonsistenz-Prüfung arbeitet mit Heuristiken: Sie hilft, Fehler zu finden, kann aber welche übersehen und korrekte Daten markieren. Sie ersetzt keine sorgfältige Prüfung der Buchhaltung.

## Lizenz

[MIT](LICENSE): Der Code darf genutzt, kopiert, verändert und weitergegeben werden, auch kommerziell, solange der Copyright-Vermerk und der Lizenztext jeder Kopie beiliegen. Es gibt keine Gewährleistung.
