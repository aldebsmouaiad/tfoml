<p class="eyebrow">Projekt / Inhalte ergänzen</p>

# Ein neues Übungsblatt hinzufügen

Für jedes neue Blatt wird zuerst das Original geprüft. Die Plattform kann viele Blätter aufnehmen; sie erzeugt aber keine vermeintlichen Aufgaben allein aus den Themen der Vorlesung.

## 1. Eine Seite anlegen

Im Projektordner:

```bash
python scripts/new_exercise.py --sheet 2 --task 1 --title "Titel der Aufgabe"
```

Der Generator verwendet `templates/aufgabe.md`, erzeugt einen eindeutigen Pfad und überschreibt keine vorhandene Datei. Füge die ausgegebene Seite in die Navigation von `mkdocs.yml` ein. Lege für mehrere Aufgaben außerdem eine Übersichtsseite `docs/blatt-02/index.md` mit der Aufgaben- und Quellenzuordnung an.

## 2. Inhalt wissenschaftlich ausarbeiten

| Bestandteil | Leitfrage |
|---|---|
| Originalaufgabe | Was wird tatsächlich verlangt, mit welchem Semester- und Seitenbezug? |
| Voraussetzungen | Welcher Raum, welche Verteilung, welche Parameterbereiche, welche Realisierbarkeit? |
| Grundlagen | Welche Definitionen und Sätze werden benutzt, und warum gelten sie hier? |
| Beweisidee | Wie kommt man auf den entscheidenden Schritt? |
| Schritte | Welche Aussage, welche Begründung und welche Intuition gehören zusammen? |
| Experiment | Welche mathematische Eigenschaft kann sinnvoll verändert oder sichtbar gemacht werden? |
| Selbstkontrolle | Welcher typische Denkfehler soll erkannt werden? |
| Quellen | Was stammt aus dem Material, was wurde selbst hergeleitet? |

## 3. Bausteine wiederverwenden

Aufklappbare Beweise:

```html
<div class="tf-proof" markdown="1">
<details markdown="1"><summary>Erster Schritt</summary>

Mathematische Aussage, Begründung und Intuition.

</details>
</div>
```

Die Steuerung für einzelne Schritte und „Alle öffnen“ wird automatisch ergänzt. Die Inhalte bleiben auch ohne JavaScript über die nativen `details`-Elemente bedienbar.

Vorhandene Labore:

| `data-tf-lab` | Fachlich passender Einsatz |
|---|---|
| `finite` | Endliche realisierbare Klassen, Exponentialschranke |
| `rectangles` | Kleinstes positives Rechteck, vier Randstreifen unter Uniform-D |
| `pac` | Verteilungsfreie Rechteckschranke und spezifische Monte-Carlo-Simulation |
| `vc` | Shattering bei achsenparallelen Rechtecken |

Ein Labor wird nur eingebunden, wenn seine Voraussetzungen zur neuen Aufgabe passen. Für andere Hypothesenklassen oder Verteilungen wird zuerst die Mathematik in `math-core.js` ergänzt und geprüft, anschließend eine passende Oberfläche in `learning.js` registriert.

## 4. Prüfen und veröffentlichen

```bash
python -m mkdocs build --strict
npm test
python scripts/check_site.py
```

Prüfe anschließend im Browser Formeln, Tastaturbedienung, kleine Bildschirmbreite und das Verhalten bei ungültigen Eingaben. Nach einem Push auf `main` prüft der Workflow erneut und veröffentlicht nur nach erfolgreichen Prüfungen, sofern Pages für das Repository eingerichtet ist.

## Umfang weiterer Blätter

Sinnvoll ist, pro neuem Blatt zunächst eine Quellen- und Aufgabenübersicht zu erstellen. Danach werden die Aufgaben vollständig ausgearbeitet. Bei einer unklaren oder fehlerhaften Aufgabenstellung wird die Unklarheit direkt neben der betreffenden Aussage dokumentiert; nötige Zusatzannahmen werden ausdrücklich genannt.
