<p class="eyebrow">Projekt / Technische Architektur</p>

# Ein statisches, erweiterbares Lernbuch

Die Inhalte liegen als Markdown im GitHub-Projekt. MkDocs Material erzeugt daraus die Navigation, Suchdaten und HTML-Seiten. MathJax stellt die Formeln dar. JavaScript berechnet die Experimente direkt im Browser; GitHub Pages kann das fertige Verzeichnis ausliefern.

| Entscheidung | Begründung |
|---|---|
| MkDocs Material statt einer großen selbstgebauten Webanwendung | Viele künftige Übungsblätter sollen leicht lesbar, durchsuchbar und als Markdown pflegbar bleiben. |
| MathJax mit lokalem SVG-Bundle | Formeln funktionieren ohne externen CDN-Aufruf und benötigen keine separat geladenen Mathematik-Schriftdateien. |
| Plotly für Wahrscheinlichkeitskurven | Zoomen, Werte ablesen und Grafikexport unterstützen den Vergleich der Schranken. Eine lokale SVG-Ausgabe dient als Fallback. |
| SVG für Rechtecke und Punkte | Für diese einfachen geometrischen Konstruktionen genügt eine kleine, direkt prüfbare Darstellung. JSXGraph wäre hier eine zusätzliche, noch nicht benötigte Abhängigkeit. |
| Reiner numerischer JavaScript-Kern | Formeln, Zufallszahlen, Lernalgorithmus und Fehlerberechnung lassen sich ohne Oberfläche testen. |
| GitHub Actions und Pages | Ein Build überprüft Änderungen und erzeugt anschließend die statische Website. |
| Kein Python-Backend | Die vorhandenen Simulationen sind klein genug für browserseitige Berechnung; ein dauerhafter Server bietet hier keinen zusätzlichen Nutzen. |

## Installation und Veröffentlichung

Die vollständigen Befehle und die Anleitung für GitHub Pages stehen in der `README.md` im Projektverzeichnis. Benötigt werden Python 3.12 zum Bauen und Node.js 24 für die Tests. Besucher benötigen nur einen Browser.

Die Übergabe umfasst den vollständigen Quellcode sowie eine gebaute `site/`-Fassung. Die Konfiguration zielt auf `aldebsmouaiad/tfoml`. Ein noch nicht angelegtes GitHub-Repository oder eine lediglich konfigurierte URL wird nicht als erfolgtes Deployment bezeichnet.

## Trennung von Inhalt und Berechnung

Eine Aufgabenseite enthält die Aufgabenstellung, Quellen und Beweise. Ein Element wie

```html
<div class="tf-lab" data-tf-lab="rectangles"></div>
```

bindet das passende Labor ein. Die numerischen Funktionen in `math-core.js` sind unabhängig von HTML. Die Bedienoberfläche in `learning.js` ist für Eingaben, Rückmeldungen, Farben und Diagramme zuständig.

## Reproduzierbarkeit

Der Zufallsgenerator erhält einen expliziten 32-Bit-Seed. Identische Parameter und identischer Seed liefern dieselben pseudorandomisierten Ergebnisse. Beim Erhöhen von \(m\) im Geometrie-Labor bleiben die ersten Punkte gleich. Die Monte-Carlo-Simulation erzeugt getrennte Trainingsstichproben aus demselben reproduzierbaren Zufallsstrom.

Python-Pakete stehen mit festen Versionen in `requirements.txt`; die Testabhängigkeiten sind über `package-lock.json` festgelegt. Die lokal eingebundenen Bibliotheken besitzen Versionsangaben und Lizenzdateien.

## Was wird geprüft?

- Stichprobenschwellen, Rundung und monotone Schranken.
- Null Trainingsfehler, leere positive Stichproben, entartete Rechtecke und konsistente Fehlerberechnung.
- Streifenmassen und das geometrische Trefferkriterium unter der Simulationsverteilung.
- Alle 16 Beschriftungen der Vier-Punkte-Konstruktion und Extrempunktbeispiele mit Gleichständen.
- Eingaben, Beweissteuerung, Fragenfeedback und Simulationsrückmeldungen in einer DOM-Testumgebung.
- MathJax-Verarbeitung der Formeln im gebauten Lernbuch.
- Lokale Links, Assets und der strikte MkDocs-Build.

Ein DOM-Test ersetzt keine Sichtprüfung in einem echten Browser. Ein lokaler Build ersetzt kein erfolgreiches GitHub-Pages-Deployment. Der tatsächliche Stand steht in `VALIDATION.md`.

## Bedienung und Datenschutz

Schieberegler, Tasten und Beschriftungswechsel sind per Tastatur erreichbar. Statusmeldungen verwenden Live-Regionen. Farbe wird durch Text und unterschiedliche Punktsymbole ergänzt. Die Suchfunktion und die Experimente arbeiten lokal. Lernfortschrittsmarkierungen werden nur im `localStorage` dieses Browsers gespeichert; ein Benutzerkonto oder eine serverseitige Datenbank ist dafür nicht erforderlich.

Weitere Funktionen wie schwere Optimierungsexperimente oder Nutzerkonten können später eine andere Architektur erfordern. Für Blatt 01 sind sie nicht nötig.
