<p class="eyebrow">Werkzeugkasten / Beweislogik</p>

# Eine Folgerung mathematisch sauber beweisen

Bei einer Implikation \(A\Rightarrow B\) darfst du **A als zusätzliche Annahme verwenden** und musst daraus B herleiten. Du musst A nicht beweisen, wenn genau diese Implikation die Aufgabe ist. Alle übrigen Voraussetzungen des Satzes bleiben aber ebenfalls wichtig.

## Beispiel aus der Rechteck-Aufgabe

Setze

\[
A:\quad m\ge\frac4\varepsilon\ln\frac4\delta,
\qquad
B:\quad\Pr(L_D(h_S)>\varepsilon)\le\delta.
\]

Die Stichprobenbedingung A enthält nur Zahlen. Die Schlussfolgerung B betrifft einen Lernalgorithmus. **Es braucht eine Brücke zwischen beiden:** das zuvor bewiesene Resultat

\[
\Pr(L_D(h_S)>\varepsilon)\le4e^{-m\varepsilon/4}.
\]

Allein A hinzuschreiben reicht deshalb noch nicht. Erst zusammen mit dieser probabilistischen Abschätzung kann B bewiesen werden.

## Ein vollständiger kurzer Beweis

Es seien \(0<\varepsilon,\delta<1\), und die Voraussetzungen des Rechteck-Lernmodells seien erfüllt. Sei

\[
m\ge\frac4\varepsilon\ln\frac4\delta.
\]

Nach dem Vier-Randstreifen-Argument und dem Union Bound gilt

\[
\Pr(L_D(h_S)>\varepsilon)
\le4e^{-m\varepsilon/4}
\le4e^{-\ln(4/\delta)}
=\delta.
\]

Die zweite Ungleichung folgt aus der angenommenen Bedingung an \(m\), dem Vorzeichenwechsel bei Multiplikation mit \(-\varepsilon/4\) und der Monotonie der Exponentialfunktion. Damit ist die Implikation bewiesen.

## Implikation und Äquivalenz unterscheiden

| Gewünschte Aussage | Was bewiesen werden muss |
|---|---|
| \(A\Rightarrow B\) | Unter Annahme A folgt B. |
| \(A\Leftrightarrow B\) | Sowohl \(A\Rightarrow B\) als auch \(B\Rightarrow A\). |
| A ist hinreichend für B | \(A\Rightarrow B\). |
| A ist notwendig für B | \(B\Rightarrow A\). |

Die Stichprobengröße aus Blatt 01 ist **hinreichend** für die PAC-Garantie. Daraus folgt nicht, dass ein kleineres \(m\) grundsätzlich scheitert.

## Kontraposition im geometrischen Beweis

Aus „alle vier Streifen getroffen ⇒ kleiner Fehler“ folgt äquivalent

\[
\text{großer Fehler}\ \Longrightarrow\ \text{mindestens ein Streifen nicht getroffen}.
\]

Das ist die Kontraposition \(A\Rightarrow B\iff\neg B\Rightarrow\neg A\). Die Umkehrung „mindestens ein leerer Streifen ⇒ großer Fehler“ ist dagegen nicht bewiesen und im Allgemeinen falsch.

## Eine hilfreiche Arbeitsroutine

1. Schreibe die **Voraussetzungen** auf, einschließlich Parameterbereiche und Zufallsmodell.
2. Schreibe das **Ziel** als exakte Aussage auf.
3. Suche ein bereits bewiesenes Resultat, dessen Schlussfolgerung nah am Ziel liegt.
4. Setze die angenommene Voraussetzung an einer ausdrücklich benannten Stelle ein.
5. Prüfe Vorzeichen, Monotonie, Quantoren und die Richtung jeder Implikation.

<div class="tf-quiz"><p><strong>Du hast A ⇒ B bewiesen. Welche Aussage folgt logisch ebenfalls?</strong></p><button data-correct="true" data-feedback="Die Kontraposition ist logisch äquivalent zur ursprünglichen Implikation.">Nicht B ⇒ nicht A.</button><button data-correct="false" data-feedback="Das wäre die Umkehrung. Sie benötigt einen eigenen Beweis und kann falsch sein.">B ⇒ A.</button><p class="feedback" role="status" aria-live="polite"></p></div>

**Einordnung:** Eigene Lernhilfe zur Beweisstruktur von Blatt 01. Die probabilistische Hilfsabschätzung wird in [Aufgabe 2](../blatt-01/aufgabe-2.md) vollständig bewiesen.
