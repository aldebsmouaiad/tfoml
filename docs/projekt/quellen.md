<p class="eyebrow">Projekt / Wissenschaftliche Grundlage</p>

# Welche Quelle beantwortet welche Frage?

Die vorhandenen Unterlagen wurden nach Struktur und Themen erschlossen; für Blatt 01 wurden die relevanten Passagen gezielt geprüft. Das bedeutet keine vollständige fachliche Prüfung aller 2.480 Buch- und Folienseiten. Die Vorlesung gibt den Rahmen und die Notation vor; das konkrete Übungsblatt bestimmt die zu lösenden Aufgaben.

## Bestand und Rolle

| Quelle | Vorliegende Fassung | Nutzung |
|---|---|---|
| `exercises.pdf` | 1 PDF-Seite; Blatt 01, Lecture 01, **WS 25/26** | Verbindliche Aufgabenabfolge der ersten Umsetzung |
| `VL.pdf` | 1.141 PDF-Seiten, mit wiederholten Folien/Einblendungen | Agenda, Lernmodell, Notation und Beweisrahmen |
| Shai Shalev-Shwartz & Shai Ben-David, *Understanding Machine Learning: From Theory to Algorithms* | Buch von 2014; bereitgestellte PDF mit 310 Seiten | Primäre ergänzende Quelle für PAC, ERM, Union Bound, Rechtecke und VC-Dimension |
| Francis Bach, *Learning Theory from First Principles* | PDF-Titelseite: 26. Mai 2025; 488 Seiten | Vertiefung zu Konzentration, Generalisierung und Optimierung |
| Simon J. D. Prince, *Understanding Deep Learning* | PDF-Titelseite: 8. Februar 2026; 541 Seiten | Spätere Verbindung zur Praxis tiefer Netze, Regularisierung und Generalisierung |

Dateinamen und Publikationsjahr einer Folienbibliografie sind nicht immer identisch mit dem Versionsdatum der hochgeladenen PDF. Die Angaben oben folgen den tatsächlich vorhandenen Dateien. Die 1.141 PDF-Seiten der Vorlesung sind keine 1.141 eigenständigen Themen.

## Themen der Vorlesung

Die Agenda auf `VL.pdf`, PDF-Seite 2, nennt:

| Themenbereich | Zusammenhang | Sinnvolle spätere Visualisierung |
|---|---|---|
| Statistisches Lernen und PAC | Wahre und empirische Fehler; verteilungsfreie Garantien | Wiederholte Trainingsstichproben, Lernkurven |
| Uniforme Konvergenz | Gleichzeitige Kontrolle aller Hypothesen | Empirische und wahre Risiken über eine Modellklasse |
| Bias-Varianz / Bias-Komplexität | Modellbeschränkung und Datenabhängigkeit | Wiederholte Fits und Fehlerzerlegung im passenden Verlustmodell |
| VC-Dimension | Shattering als Maß der Ausdrucksstärke | Punktmengen und Beschriftungen |
| Konvexe Lernprobleme | Geometrie der Optimierung | Zielfläche und Gradientenpfade |
| Regularisierung und Stabilität | Einfluss einer einzelnen Beobachtung und Regularisierung | Datenpunkt ändern, Lösung vergleichen |
| Stochastischer Gradientenabstieg | Zufällige Updates und Konvergenz | Trajektorien bei verschiedenen Schrittweiten |
| Deep Learning / Double Descent | Grenzen klassischer Schranken und Interpolationsphänomene | Fehler gegen Modellgröße in einem klar definierten Modell |
| PAC-Bayes | Prior, Posterior und KL-Term | Trade-off aus empirischem Risiko und Komplexität |
| Flachheit der Verlustlandschaft | Lokale Geometrie und Reparametrisierung | Vergleich verschiedener Koordinatisierungen |

Das sind Themen für die Erweiterung, **keine erfundenen Übungsblätter**. Aufgaben, Voraussetzungen und Zielaussagen späterer Blätter werden erst aus den jeweiligen Originalen übernommen.

## Konkrete Zuordnung für Blatt 01

| Aufgabe | Vorlesung / Lehrbuch | Was übernommen wird | Eigener Beitrag |
|---|---|---|---|
| 1 | `VL.pdf`, PDF 32–49; UML Kap. 2.3, Buch S. 19–20 / PDF 35–36 | Realisierbarer Union Bound, Korollar 2.3 | Vollständige Algebra, Ganzzahligkeit, Parameterlabor |
| 2.1 | UML Aufgabe 2.3, Buch S. 20–21 / PDF 36–37; ergänzend Kap. 8.2.1, Buch S. 78 / PDF 94 | Kleinstes positives Rechteck als ERM | Fall ohne positive Beobachtung, konkrete Implementierung |
| 2.2 | UML Aufgabe 2.3, Hinweis zu vier Randrechtecken, PDF 37 | Geometrische Beweisidee | Behandlung geringer Zielmasse und Quantile für Atome |
| 2.3 | `VL.pdf`, PDF 40–45; UML Aufgabe 2.3 | Produktabschätzung und Union Bound | Ausgeschriebene Implikation, Simulation mit getrennten Unsicherheitsbegriffen |
| 2.4 | `VL.pdf`, PDF 180–185; UML Definition 6.5 und Kap. 6.3.3, Buch S. 46–47 / PDF 62–63 | Shattering und Extrempunktargument | Interaktive 16 Beschriftungen, Behandlung von Extrempunkt-Gleichständen |

**UML** steht hier für das Buch von Shalev-Shwartz/Ben-David. Die Buchseitenzahlen und PDF-Seitenzahlen werden bewusst getrennt genannt.

## Die Rolle der weiteren Bücher

Bei Bach sind für die nächsten Schritte insbesondere die mathematischen Voraussetzungen und Konzentrationsungleichungen relevant (PDF-Seiten 19–36, Hoeffding ab PDF 26), anschließend die Einführung in überwachtes Lernen ab PDF 37. Das Buch bietet eine vertiefende Perspektive, ist aber nicht nötig, um die elementare Algebra von Aufgabe 1 zu rechtfertigen.

Prince beginnt die Darstellung überwachten Lernens ab PDF 31; die spätere Diskussion *Why does deep learning work?* beginnt ab PDF 416, mit Generalisierung ab PDF 425. Diese Teile sind für die späteren Deep-Learning-Themen relevant. Das Rechteck-PAC-Argument wird hier nicht diesem Buch zugeschrieben.

## Dokumentierte Präzisierungen

1. **Parameterbereiche:** \(0<\varepsilon,\delta<1\), \(|H|\ge1\), unabhängige identische Ziehungen und Realisierbarkeit sind ausdrücklich angegeben.
2. **Leere positive Stichprobe:** Ausgabe \(h_0\equiv0\), bei Bedarf als Erweiterung der Rechteckklasse gekennzeichnet.
3. **Kleine Zielmasse:** \(D(R^\star)\le\varepsilon\) wird vor dem Streifenargument erledigt.
4. **Atome:** Quantilgrenzen ersetzen die nicht immer mögliche Forderung nach exakt \(\varepsilon/4\) Masse.
5. **Hinreichend vs. notwendig:** Die berechnete Datenmenge ist eine Zertifizierung durch die jeweilige Schranke; keine allgemeine untere Schranke des Lernproblems.

## Umgang mit dem Material

Das Projekt enthält eigene Lerntexte, mathematische Formulierungen der Aufgaben und Quellenverweise. Vollständige Bücher und die Vorlesungs-PDF werden nicht im öffentlichen Repository mitgeliefert. Die mathematischen Erläuterungen sind keine offizielle oder von den Lehrenden geprüfte Musterlösung.

## Technische Referenzen

- [Material for MkDocs: mathematische Formeln](https://squidfunk.github.io/mkdocs-material/reference/math/)
- [GitHub Docs: eigene Pages-Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Docs: Veröffentlichungsquelle konfigurieren](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Diese offiziellen Dokumentationen wurden bei der Einrichtung der Konfiguration geprüft. Der tatsächliche Veröffentlichungsstatus wird getrennt vom erfolgreichen lokalen Build dokumentiert.
