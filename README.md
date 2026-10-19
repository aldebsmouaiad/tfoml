# TFOML · Verstehen durch Ausprobieren

Deutschsprachiges interaktives Lernbuch für **Theoretical Foundations of Machine Learning**. Eigenständige Ausarbeitung auf Grundlage des bereitgestellten Übungsblatts 01 (WS 25/26), der Vorlesung und der angegebenen Lehrbücher. Keine offizielle Musterlösung.

## Enthalten

- Vollständige Herleitung für endliche Klassen, einschließlich kleinster ganzer Stichprobengröße.
- Rechteck-ERM, vier Randstreifen, PAC-Schranke und VC-Dimension 4.
- Vier Experimente: Stichprobenschranke, Rechteck-Geometrie, Monte-Carlo-Simulation, Shattering.
- Beweisschritte einzeln öffnen, Hinweise, Verständnisfragen mit Feedback, lokale Lernfortschrittsmarkierungen.
- Quellenanalyse, explizite Behandlung fehlender Voraussetzungen, Notation und Implikationslogik.
- Responsive Material-Oberfläche mit Hell-/Dunkelmodus, Suche und Inhaltsverzeichnis.
- Aufgabenvorlage und Generator für weitere Übungsblätter.
- Automatische Rechen- und DOM-Tests, strikter MkDocs-Build, GitHub-Pages-Workflow.

## Lokal starten

Benötigt: Python 3.12, optional Node.js 24 für die Tests. Die Lernseite selbst ist statisch und benötigt kein Backend.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m mkdocs serve
```

Danach `http://127.0.0.1:8000` öffnen. Windows: `.venv\Scripts\Activate.ps1` statt `source`.

## Build und Prüfung

```bash
python -m mkdocs build --strict
npm ci --ignore-scripts
npm test
python scripts/check_site.py
```

Ausgabe: `site/`. Ein bereits gebautes `site/` ist zusätzlich im Übergabe-ZIP enthalten. Für Suche und Webfunktionen am besten per HTTP öffnen:

```bash
python3 -m http.server 8000 --directory site
```

Kein Framework-Build im Browser und keine personenbezogenen Datenübertragungen. MathJax und Plotly werden aus versionierten lokalen Dateien geladen. `npm` wird nur für die Entwicklungs-Tests benötigt.

## Auf GitHub veröffentlichen

Zielname: **`tfoml`** im Konto `aldebsmouaiad`. Die Veröffentlichung ist vorbereitet; das Repository wurde in dieser Übergabe noch nicht erstellt und Pages noch nicht ausgeführt.

1. Unter [github.com/new](https://github.com/new) ein öffentliches Repository `tfoml` anlegen. Für den hier beschriebenen Terminalweg leer lassen. Public entspricht dem Projektauftrag; GitHub Free unterstützt Pages aus öffentlichen Repositories.
2. Den Inhalt dieses Projektordners in das Repository übertragen. Terminal aus diesem Ordner:

   ```bash
   git init -b main
   git add .
   git commit -m "Add interactive TFOML learning platform"
   git remote add origin https://github.com/aldebsmouaiad/tfoml.git
   git push -u origin main
   ```

   Normale GitHub-Anmeldung verwenden; Zugangsdaten gehören nicht in Dateien oder Chatnachrichten. Falls das Repository schon einen Commit enthält, zuerst klonen und die Projektdateien hineinkopieren statt diese Initialisierungsbefehle zu wiederholen. Der erzeugte Ordner `site/` wird durch `.gitignore` ausgeschlossen.
3. Im Repository **Settings → Pages → Build and deployment → Source → GitHub Actions** wählen.
4. Unter **Actions → Build, test and deploy TFOML → Run workflow** starten. Künftige Pushes auf `main` starten den Workflow automatisch. Falls der erste Push vor der Pages-Einstellung fehlschlägt, den Workflow danach erneut ausführen.
5. Erst nach erfolgreichem Deploy die im Actions-Ergebnis ausgegebene URL öffnen. Bei genau diesem Namen lautet die erwartete Adresse `https://aldebsmouaiad.github.io/tfoml/`; sie ist noch keine bestätigte Live-Adresse.

Wenn das Repository hier mit README initialisiert angelegt wird, kann der GitHub-Connector anschließend die vorbereiteten Dateien direkt in einem Commit ergänzen. Ein Repository-Link reicht, um das Ziel eindeutig festzulegen.

Offizielle Referenzen: [GitHub Pages Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Pages-Quelle einstellen](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Struktur

| Pfad | Zweck |
|---|---|
| `mkdocs.yml` | Navigation, Formeln, Design, Suchkonfiguration |
| `docs/blatt-01/` | Inhalt und Lösungen des ersten Blatts |
| `docs/grundlagen/` | Notation und Beweislogik |
| `docs/projekt/` | Quellenanalyse, Architektur, Erweiterung |
| `docs/assets/javascripts/math-core.js` | Testbare mathematische Funktionen, RNG, Risiko, VC-Konstruktion |
| `docs/assets/javascripts/learning.js` | Slider, SVG-Geometrie, Plotly, Beweise, Fragen |
| `docs/assets/vendor/` | MathJax 3.2.2 und Plotly 2.35.2, mit Lizenzen |
| `templates/aufgabe.md` | Wiederverwendbare Inhaltsvorlage |
| `scripts/new_exercise.py` | Legt eine neue Aufgabendatei an |
| `tests/` | Mathematische Tests, DOM-Interaktionen und MathJax-Prüfung |
| `.github/workflows/pages.yml` | Build und Test für Änderungen; Deployment von `main` |

## Weitere Aufgaben

```bash
python scripts/new_exercise.py --sheet 2 --task 1 --title "Titel aus dem Originalblatt"
```

Danach Originalaufgabe, Voraussetzungen, Quellen, Lösung und Experiment ausarbeiten und die Seite in `mkdocs.yml` eintragen. Details: `docs/projekt/erweitern.md`.

## Grenzen und Qualität

- Eine Simulation illustriert ein Modell; sie beweist keinen allgemeinen Satz.
- Die Geometriesimulation verwendet Uniform([0,1]²). Die schriftliche PAC-Garantie gilt unter den präzisierten Annahmen für beliebiges D.
- Der Fall ohne positive Beispiele und atomare Verteilungen werden ausdrücklich behandelt.
- Die Statusdatei `VALIDATION.md` trennt lokale Prüfungen, Browserprüfung und tatsächliches Deployment.
- Das vollständige Quellmaterial (Bücher, Folien-PDF) wird nicht veröffentlicht. Referenzen stehen im Lernbuch.
- Inhalte und Gestaltung können vor einer formalen Abgabe oder Weiterverwendung fachlich überprüft werden; keine Bestätigung durch Lehrende wird behauptet.

## Drittanbieter und Lizenzen

MathJax: Apache-2.0, Plotly.js: MIT. Die jeweiligen Lizenztexte liegen neben den eingebundenen Dateien. MkDocs und Material werden über `requirements.txt` installiert; ihre Lizenzen bleiben in den Paketen erhalten. Für die eigenen Lerntexte und den eigenen Projektcode wird durch diese Übergabe keine zusätzliche öffentliche Lizenz festgelegt.
