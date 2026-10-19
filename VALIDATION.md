# Prüfstatus der Übergabe

Stand: 19. Oktober 2026. Quellcode und gebaute Website für Blatt 01 (WS 25/26).

| Prüfung | Ergebnis |
|---|---|
| `python -m mkdocs build --strict` | Erfolgreich, ohne Warnungen |
| `npm test` | 23 Tests erfolgreich |
| Mathematischer Kern | Beispielwerte 77 und 176; Ganzzahligkeit, Monotonie, Leerfälle, entartete Rechtecke, Fehlerberechnung und reproduzierbarer Zufall geprüft |
| Geometrie | Null Trainingsfehler über 200 Seeds, Trefferkriterium und Streifenmassen geprüft |
| VC-Konstruktion | Alle 16 Beschriftungen; 200 Fünf-Punkte-Mengen mit möglichen Koordinatengleichständen geprüft |
| DOM-Interaktionen | Slider, Seed-Eingaben, Reset, Beweissteuerung, Fragen, Fortschritt und Simulation getestet |
| MathJax | Formeln der gebauten HTML-Seiten im DOM verarbeitet; keine mathematischen Parsefehler |
| Lokale Verweise | 11 HTML-Seiten, 549 lokale Verweise und 83 Suchindexeinträge geprüft |
| JavaScript-Syntax | Prüfung erfolgreich |
| Echte Browseransicht / mobile Sichtprüfung | **Nicht durchgeführt:** Die vorgesehene Browser-Testintegration war nicht verfügbar. DOM-Tests ersetzen keine Sichtprüfung. |
| Plotly in einem echten Browser | **Nicht visuell geprüft.** Die App verwendet die lokal eingebundene Standardbibliothek; die interaktive Logik und der SVG-Fallback wurden in der DOM-Umgebung getestet. |
| GitHub-Repository anlegen | **Offen:** Der verbundene GitHub-Connector bietet keine Funktion für eine Repository-Neuanlage. |
| GitHub-Pages-Deployment | **Nicht ausgeführt:** Workflow vorbereitet; benötigt das neue Repository und aktivierte Pages-Veröffentlichung. |

Die mathematischen Tests kontrollieren Berechnungen und ausgewählte Eigenschaften. Sie ersetzen nicht die schriftlichen allgemeinen Beweise. Insbesondere wird die verteilungsfreie Aussage über das explizite Quantilargument bewiesen, nicht über die Uniform-Simulation.

## Reproduktion

```bash
python -m pip install -r requirements.txt
npm ci --ignore-scripts
python -m mkdocs build --strict
npm test
python scripts/check_site.py
```

Nach der erstmaligen Veröffentlichung sollten zusätzlich die tatsächliche Live-Seite, Suchfunktion, Hell-/Dunkelmodus, eine kleine Bildschirmbreite und alle vier Labore im Browser geprüft werden. Erst ein erfolgreicher Actions-Deploy bestätigt die Live-Adresse.
