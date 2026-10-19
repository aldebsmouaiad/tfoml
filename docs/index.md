<div class="hero" markdown="1">
<p class="eyebrow">Theoretical Foundations of Machine Learning</p>

# Lernen verstehen.<br>Beweise selbst entwickeln.

<p class="lede">Wie werden aus endlich vielen Beispielen verlässliche Vorhersagen? Erkunde die Mathematik dahinter – mit vollständigen Herleitungen, veränderbaren Grafiken und Experimenten.</p>

<div class="meta-row"><span class="pill">Übungsblatt 01 · WS 25/26</span><span class="pill">2 Aufgaben + VC-Bonus</span><span class="pill">4 interaktive Experimente</span></div>

[Mit Blatt 01 beginnen](blatt-01/index.md){ .tf-btn }
[Zuerst die Notation klären](grundlagen/notation.md){ .tf-btn .secondary }

<p class="formula">Beobachten → Vermuten → Begründen → Beweisen</p>
</div>

## Dein erster Lernpfad

<div class="learning-grid" markdown="1">
<a class="learning-card" href="blatt-01/aufgabe-1.html"><span class="card-number">01 / STICHPROBENKOMPLEXITÄT</span><h3>Wie viele Beispiele reichen?</h3><p>Leite eine Stichprobenschranke aus dem Union Bound her. Entdecke, wie ε, δ und die Größe der Hypothesenklasse zusammenwirken.</p><span class="card-link">Endliche Klassen erkunden →</span></a>
<a class="learning-card" href="blatt-01/aufgabe-2.html"><span class="card-number">02 / PAC-LEARNING</span><h3>Ein Rechteck lernt seine Grenzen.</h3><p>Erzeuge Trainingspunkte, beobachte den Lernalgorithmus und verstehe, weshalb vier Randstreifen die Generalisierung kontrollieren.</p><span class="card-link">Rechteck-Labor öffnen →</span></a>
<a class="learning-card" href="blatt-01/vc-dimension.html"><span class="card-number">BONUS / VC-DIMENSION</span><h3>Vier Punkte. Sechzehn Möglichkeiten.</h3><p>Wechsle die Beschriftungen und konstruiere passende Rechtecke. Finde heraus, was bei fünf Punkten grundsätzlich schiefgeht.</p><span class="card-link">Beschriftungen ausprobieren →</span></a>
<a class="learning-card" href="grundlagen/beweise.html"><span class="card-number">WERKZEUG / BEWEISLOGIK</span><h3>Was bedeutet eigentlich „folgt“?</h3><p>Unterscheide Voraussetzung, Hilfssatz und Schlussfolgerung. Beweise eine Implikation mit einer nachvollziehbaren Ungleichungskette.</p><span class="card-link">Beweislogik verstehen →</span></a>
</div>

## So arbeitest du mit dem Lernbuch

1. **Formuliere das Ziel in eigenen Worten.** Welcher Parameter ist gesucht, was ist zufällig, was ist fest?
2. **Versuche den nächsten Schritt selbst.** Nutze zuerst den Hinweis und öffne dann die Beweisschritte einzeln.
3. **Verändere im Labor genau einen Parameter.** Formuliere vorab eine Vermutung und überprüfe sie anschließend.
4. **Kehre zum Beweis zurück.** Welche Aussage gilt für jedes zulässige Problem, welche nur für das gezeigte Beispiel?

## Was bereits enthalten ist

Blatt 01 ist vollständig ausgearbeitet: die Aufgabe zu endlichen Klassen, die drei Teile zum Rechteck-Lerner und der Bonus zur VC-Dimension. Hinzu kommen Notationshilfe, Beweislogik, Quellenzuordnung und eine Vorlage für weitere Aufgaben.

Die zugrunde liegende Datei `exercises.pdf` trägt **WS 25/26**. Sie wird hier nicht als aktuelles Blatt eines anderen Semesters ausgegeben. Für weitere Übungsblätter wird die jeweilige Originaldatei benötigt; die Vorlesungsagenda allein legt deren Aufgaben nicht fest.

!!! info "Wie du die Aussagen einordnest"
    **Aufgabenstellung** stammt aus dem bereitgestellten Blatt. **Herleitungen und Lerntexte** sind eigenständige Ausarbeitungen auf Basis der angegebenen Quellen. **Simulationen** illustrieren ausgewählte Verteilungen. Diese Seite ist keine offizielle Musterlösung der Lehrveranstaltung.

## Warum das auch praktisch wichtig ist

Ein Modell kann alle Trainingsdaten richtig vorhersagen und dennoch bei neuen Daten Fehler machen. PAC-Learning präzisiert, wie Fehlertoleranz, Anzahl der Daten und Modellklasse zusammenhängen. Die Schranken erklären Bedingungen für verlässliches Lernen; sie sind keine pauschalen Empfehlungen für die Datensatzgröße eines realen Deep-Learning-Projekts.
