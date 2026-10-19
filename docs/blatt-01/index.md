<p class="eyebrow">Übungsblatt 01 · Lecture 01 · WS 25/26</p>

# Von null Trainingsfehler zu einer Lerngarantie

**Leitfrage:** Unter welchen Voraussetzungen wird aus einer Hypothese, die zur Stichprobe passt, ein Modell mit kleinem Fehler auf neuen Daten?

| Teil | Was du zeigen sollst | Benötigte Grundlagen | Passendes Experiment |
|---|---|---|---|
| [1 · Endliche Klassen](aufgabe-1.md) | Die gegebene Schranke nach der kleinsten ganzen Stichprobengröße auflösen | Logarithmus, Monotonie, Vorzeichenwechsel, Aufrunden | ε, δ, \(\lvert H\rvert\) und \(m\) verändern; Garantieschwelle beobachten |
| [2.1 · ERM](aufgabe-2.md#teil-21-warum-ist-das-kleinste-rechteck-ein-erm) | Null Trainingsfehler des kleinsten positiven Rechtecks | Realisierbarkeit, Minima/Maxima, Inklusion | Positive und negative Punkte sowie gelerntes Rechteck |
| [2.2 · Vier Randstreifen](aufgabe-2.md#teil-22-warum-genugen-vier-getroffene-randstreifen) | Aus vier Treffern folgt \(L_D\le\varepsilon\) | Fehlerregion, Mengenvereinigung, Subadditivität | Randstreifen, Treffer und Fehlerfläche einblenden |
| [2.3 · PAC-Schranke](aufgabe-2.md#teil-23-vom-geometrischen-argument-zur-pac-garantie) | Ausreichende Stichprobengröße beweisen | Unabhängigkeit, Union Bound, \(1-u\le e^{-u}\), Implikation | Theoretische Schranken und reproduzierbare Monte-Carlo-Daten |
| [2.4 · VC-Bonus](vc-dimension.md) | \(\operatorname{VCdim}(H_{\mathrm{rect}})=4\) | Shattering, Existenz- und Allaussagen, Extrempunkte | Alle 16 Beschriftungen von vier Punkten; Gegenbeispiel mit fünf Punkten |

## Empfohlene Reihenfolge

Lies bei Bedarf zuerst die [Notation](../grundlagen/notation.md). Bearbeite danach Aufgabe 1: Ihre Algebra taucht in Aufgabe 2.3 erneut auf. Aufgabe 2.1 erklärt den Algorithmus; 2.2 liefert das geometrische Argument; 2.3 verbindet Geometrie und Wahrscheinlichkeit. Der VC-Bonus betrachtet dieselbe Klasse aus einer allgemeineren Perspektive.

## Zwei Präzisierungen des Originals

**Keine positiven Punkte:** Das Blatt beschreibt das kleinste umschließende Rechteck nur, wenn positive Beispiele vorliegen. Wir definieren den Algorithmus für eine rein negative Stichprobe als den konstanten Null-Klassifikator, also das leere Rechteck. Falls die Klasse nur nichtleere Rechtecke enthalten soll, ist das eine ausdrücklich benannte Erweiterung.

**Randstreifen mit genau ε/4 Masse:** Für beliebige Verteilungen können solche Streifen fehlen, etwa bei Punktmassen. Wir erklären zuerst die anschauliche Streifenkonstruktion und beweisen den Satz anschließend auch mit Quantilgrenzen. Außerdem wird der einfache Fall \(D(R^\star)\le\varepsilon\) separat behandelt.

Diese Ergänzungen verhindern, dass stillschweigend Voraussetzungen angenommen werden, die im Blatt nicht genannt sind.

## Quellen

Aufgaben: `exercises.pdf`, PDF-Seite 1. Vorlesung: `VL.pdf`, insbesondere PDF-Seiten 15–49 für das statistische Lernmodell und endliche Klassen. Literatur: Shalev-Shwartz/Ben-David, Kapitel 2.3, Aufgabe 2.3 und Kapitel 6.3.3. Die [Quellenanalyse](../projekt/quellen.md) ordnet die weiteren Unterlagen ein.
