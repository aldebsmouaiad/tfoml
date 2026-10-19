<p class="eyebrow">Blatt 01 / Aufgabe 1</p>

# Wie viele Beispiele reichen bei endlich vielen Hypothesen?

**Lernziel:** Du kannst eine probabilistische Schranke nach \(m\) auflösen und erklären, welche Garantie sie liefert.

## Originalaufgabe

Das Blatt gibt im realisierbaren Fall für eine endliche Klasse \(H\) vor:

\[
\Pr\!\left(\exists h\in H:\ L_S(h)=0\ \text{und}\ L_D(h)>\varepsilon\right)
\le |H|e^{-\varepsilon m}.
\]

Gesucht ist die **kleinste ganze Stichprobengröße**, für die die rechte Seite höchstens \(\delta\in(0,1)\) ist. Die algebraischen Schritte sollen sauber gezeigt werden. Quelle: `exercises.pdf`, Aufgabe 1, PDF-Seite 1; mathematischer Inhalt hier wiedergegeben.

## Was ist gegeben, was ist gesucht?

Wir nehmen \(0<\varepsilon<1\), \(0<\delta<1\), \(1\le |H|<\infty\) und \(m\in\mathbb N\) an. Das Lernen ist realisierbar, und die Stichprobe besteht aus unabhängigen, identisch verteilten Beispielen.

| Symbol | Bedeutung | Was du beeinflusst |
|---|---|---|
| \(H\) | Menge zulässiger Klassifikatoren | Modellklasse / induktiver Bias |
| \(m\) | Anzahl der Trainingsbeispiele | Datenmenge |
| \(L_S(h)\) | Anteil falsch klassifizierter Trainingsbeispiele | Empirischer Fehler |
| \(L_D(h)\) | Fehlerwahrscheinlichkeit bei einem neuen Beispiel aus \(D\) | Gesuchte Qualität |
| \(\varepsilon\) | Tolerierter wahrer Fehler | Wie genau soll das Modell sein? |
| \(\delta\) | Maximal tolerierte Wahrscheinlichkeit einer schlechten Trainingsstichprobe | Wie zuverlässig soll die Lerngarantie sein? |

Ein einzelnes gelerntes Modell hat Fehler \(L_D(h_S)\). Die äußere Wahrscheinlichkeit beschreibt, **wie häufig eine neu gezogene Trainingsstichprobe zu einem schlechten Modell führt**. Diese beiden Ebenen dürfen nicht verwechselt werden.

## Erst die Idee

Die rechte Seite \(|H|e^{-\varepsilon m}\) fällt mit wachsendem \(m\). Wir suchen den Zeitpunkt, ab dem sie unter \(\delta\) liegt. Der natürliche Logarithmus entfernt die Exponentialfunktion. Danach lösen wir eine lineare Ungleichung.

??? tip "Hinweis vor dem Beweis"
    Teile zuerst durch \(|H|>0\). Wende dann \(\ln\) auf beide Seiten an. Beim anschließenden Teilen durch \(-\varepsilon<0\) dreht sich das Ungleichheitszeichen um.

## Schrittweise Lösung

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Die gewünschte Garantie als Ungleichung schreiben</summary>

\[
|H|e^{-\varepsilon m}\le\delta
\quad\Longleftrightarrow\quad
e^{-\varepsilon m}\le\frac{\delta}{|H|}.
\]

**Begründung:** Division durch die positive Zahl \(|H|\) verändert die Richtung der Ungleichung nicht.

**Intuition:** Zuerst isolieren wir den Ausdruck, in dem die gesuchte Variable steckt.
</details>
<details markdown="1"><summary>2. Den Logarithmus anwenden</summary>

\[
e^{-\varepsilon m}\le\frac{\delta}{|H|}
\quad\Longleftrightarrow\quad
-\varepsilon m\le\ln\!\left(\frac{\delta}{|H|}\right).
\]

**Begründung:** Beide Seiten sind positiv. Die Funktion \(\ln\) ist auf \((0,\infty)\) streng monoton steigend. Außerdem gilt \(\ln(e^x)=x\).

**Intuition:** Der Logarithmus macht den Exponenten zugänglich.
</details>
<details markdown="1"><summary>3. Durch eine negative Zahl teilen</summary>

\[
-\varepsilon m\le\ln\!\left(\frac{\delta}{|H|}\right)
\quad\Longleftrightarrow\quad
m\ge-\frac{1}{\varepsilon}\ln\!\left(\frac{\delta}{|H|}\right)
=\frac{\ln|H|+\ln(1/\delta)}{\varepsilon}.
\]

**Begründung:** Weil \(-\varepsilon<0\), kehrt Division durch \(-\varepsilon\) das Ungleichheitszeichen um. Danach nutzen wir \(-\ln a=\ln(1/a)\) und die Produktregel des Logarithmus.

**Intuition:** Mehr Daten machen die Schranke kleiner. Das Ergebnis muss also eine untere Schranke für \(m\) sein.
</details>
<details markdown="1"><summary>4. Die Ganzzahligkeit berücksichtigen</summary>

\[
\boxed{m_{\mathrm{UB}}(\varepsilon,\delta,|H|)
=\left\lceil\frac{\ln|H|+\ln(1/\delta)}{\varepsilon}\right\rceil.}
\]

**Begründung:** \(\lceil a\rceil\) ist die kleinste ganze Zahl, die mindestens \(a\) ist. Jeder kleinere ganzzahlige Wert verletzt die vorgegebene Exponentialschranke.

**Intuition:** Eine Stichprobe kann keine 76,01 Beispiele enthalten. Man braucht in diesem Fall mindestens 77.
</details>
<details markdown="1"><summary>5. Auf den Lernalgorithmus übertragen</summary>

Im realisierbaren Fall liefert ein ERM-Lerner \(h_S\) eine konsistente Hypothese mit \(L_S(h_S)=0\). Deshalb gilt die Ereignisinklusion

\[
\{L_D(h_S)>\varepsilon\}
\subseteq
\{\exists h\in H:L_S(h)=0\ \land\ L_D(h)>\varepsilon\}.
\]

Die Wahrscheinlichkeit des linken Ereignisses ist damit höchstens \(\delta\), sobald \(m\ge m_{\mathrm{UB}}\).

**Intuition:** Wenn keine schlechte Hypothese zu den Trainingsdaten passt, kann auch der konsistente ERM-Lerner keine schlechte Hypothese auswählen.
</details>
</div>

!!! warning "Kleinste Zahl wofür?"
    Das ist die kleinste ganze Zahl, welche **die hier gegebene obere Schranke** unter \(\delta\) bringt. Es ist nicht automatisch die kleinste für erfolgreiches Lernen notwendige Datenmenge. Der Union Bound kann die tatsächliche Ausfallwahrscheinlichkeit deutlich überschätzen.

## Interaktives Labor

<div class="tf-lab" data-tf-lab="finite"></div>
<noscript><p class="tf-noscript">Für das Labor bitte JavaScript aktivieren. Die mathematische Lösung ist auch ohne JavaScript vollständig lesbar.</p></noscript>

**Arbeitsauftrag:** Setze \(|H|=100\), \(\varepsilon=0{,}1\) und \(\delta=0{,}05\). Du solltest

\[
\left\lceil10\ln(2000)\right\rceil
=\lceil76{,}009\ldots\rceil=77
\]

erhalten. Halbiere danach \(\varepsilon\). Der ungerundete Ausdruck verdoppelt sich; wegen des Aufrundens muss die ganze Zahl nicht exakt doppelt so groß sein.

## Woher kommt die vorgegebene Schranke?

Dieser Abschnitt ergänzt die Aufgabenstellung. Für eine **fest gewählte** schlechte Hypothese mit \(L_D(h)>\varepsilon\) ist die Wahrscheinlichkeit eines korrekt klassifizierten neuen Beispiels kleiner als \(1-\varepsilon\). Wegen der Unabhängigkeit der Trainingsbeispiele gilt

\[
\Pr(L_S(h)=0)=(1-L_D(h))^m\le(1-\varepsilon)^m\le e^{-\varepsilon m}.
\]

Definiere \(H_{\rm schlecht}=\{h\in H:L_D(h)>\varepsilon\}\). Ein schlechter konsistenter Klassifikator existiert nur, wenn mindestens eines der Ereignisse \(\{L_S(h)=0\}\), \(h\in H_{\rm schlecht}\), eintritt. Der Union Bound liefert

\[
\Pr\!\left(\bigcup_{h\in H_{\rm schlecht}}\{L_S(h)=0\}\right)
\le\sum_{h\in H_{\rm schlecht}}\Pr(L_S(h)=0)
\le|H|e^{-\varepsilon m}.
\]

Die Unabhängigkeit wird **innerhalb der Stichprobe für ein festes \(h\)** benötigt. Die Fehlerereignisse verschiedener Hypothesen müssen nicht unabhängig sein.

## Warum ist das Ergebnis interessant?

Die Anzahl der Modelle tritt nur logarithmisch auf. Verdoppelt man \(|H|\), steigt der ungerundete Bedarf um \(\ln 2/\varepsilon\). Strengere Zuverlässigkeit hat ebenfalls einen logarithmischen Preis über \(\ln(1/\delta)\). Eine kleinere Fehlertoleranz ist teurer: Der Ausdruck wächst proportional zu \(1/\varepsilon\).

Das erklärt, weshalb auch große endliche Modellklassen lernbar sein können. Rechenzeit ist eine andere Frage: Diese Aussage erklärt nicht, wie schnell ein ERM gefunden werden kann.

## Selbstkontrolle

<div class="tf-quiz"><p><strong>Dein m liegt unter der berechneten Schwelle. Was darfst du folgern?</strong></p><button data-correct="false" data-feedback="Eine hinreichende Bedingung ist nicht automatisch notwendig. Eine andere Analyse oder die konkrete Verteilung kann bessere Ergebnisse erlauben.">Lernen mit der gewünschten Qualität ist unmöglich.</button><button data-correct="true" data-feedback="Die vorliegende Schranke liefert dann keine Zertifizierung. Über die tatsächliche Ausfallwahrscheinlichkeit ist damit noch keine gegenteilige Aussage bewiesen.">Diese Schranke garantiert die gewünschte Qualität noch nicht.</button><p class="feedback" role="status" aria-live="polite"></p></div>

**Typische Fehler:** durch \(-\varepsilon\) teilen ohne Zeichenwechsel; \(\log_{10}\) anstelle des natürlichen Logarithmus einsetzen; \(m\) abrunden; \(\varepsilon\) und \(\delta\) vertauschen; die Schranke für eine Gleichheit halten.

<label class="progress-toggle"><input type="checkbox" data-progress="sheet01-ex1">Ich kann die Herleitung ohne Lösung erklären.</label>

## Quellen und Einordnung

- `exercises.pdf`, Aufgabe 1, PDF-Seite 1: Aufgabenstellung.
- `VL.pdf`, PDF-Seiten 32–49, insbesondere 40–45: endliche Hypothesenklassen und Union Bound.
- Shalev-Shwartz/Ben-David, *Understanding Machine Learning*, Kapitel 2.3, Lemma 2.2 und Korollar 2.3; Buchseiten 19–20, PDF-Seiten 35–36.
- Erklärung, Rechenschritte, Experiment und Verständnisfrage: eigene didaktische Ausarbeitung.

[Weiter zum Rechteck-Lerner →](aufgabe-2.md){ .tf-btn }
