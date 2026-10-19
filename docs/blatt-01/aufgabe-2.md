<p class="eyebrow">Blatt 01 / Aufgabe 2.1–2.3</p>

# Warum vier Randstreifen eine Lerngarantie liefern

**Lernziel:** Du kannst den Rechteck-Lerner begründen, seine mögliche Fehlerregion geometrisch beschreiben und daraus eine PAC-Garantie herleiten.

## Originalaufgabe

Die Hypothesenklasse besteht aus achsenparallelen Rechteck-Klassifikatoren:

\[
h_{a_1,a_2,b_1,b_2}(x_1,x_2)=
\begin{cases}
1,&a_1\le x_1\le a_2\ \text{und}\ b_1\le x_2\le b_2,\\
0,&\text{sonst}.
\end{cases}
\]

Unter der Realisierbarkeitsannahme verlangt das Blatt:

1. Zeige, dass das kleinste Rechteck um alle positiven Beispiele null Trainingsfehler erreicht.
2. Definiere vier Randbereiche mit Masse \(\varepsilon/4\). Zeige: Trifft die Stichprobe jeden Randbereich, gilt \(L_D(R(S))\le\varepsilon\).
3. Folgere

\[
\boxed{m\ge\frac4\varepsilon\ln\!\left(\frac4\delta\right)
\quad\Longrightarrow\quad
\Pr_{S\sim D^m}\!\left(L_D(R(S))>\varepsilon\right)\le\delta.}
\]

Der [VC-Bonus](vc-dimension.md) ist separat ausgearbeitet. Quelle: `exercises.pdf`, Aufgabe 2, PDF-Seite 1; mathematischer Inhalt hier wiedergegeben.

## Modell und benötigte Grundlagen

Es existiert ein festes Zielrechteck

\[
R^\star=[a_1^\star,a_2^\star]\times[b_1^\star,b_2^\star],
\qquad y=\mathbf1_{R^\star}(x).
\]

Die Eingaben \(x_1,\ldots,x_m\) werden i.i.d. aus einer unbekannten Verteilung \(D\) auf \(\mathbb R^2\) gezogen. Die Labels enthalten im Modell kein Rauschen. Es gilt \(0<\varepsilon,\delta<1\). Schreibweise: \(D(A)\) bezeichnet die Wahrscheinlichkeit, dass ein neues Beispiel in der Menge \(A\) liegt.

**Realisierbarkeit** bedeutet, dass die Zielbeschriftung durch eine zulässige Hypothese dargestellt werden kann. Formal genügt die Übereinstimmung fast sicher bezüglich \(D\). Dann gelten die Stichprobenaussagen ebenfalls mit Wahrscheinlichkeit eins.

!!! info "Algorithmus bei keiner positiven Beobachtung"
    Wenn keine positiven Trainingspunkte vorhanden sind, setzen wir \(R(S)=\varnothing\), also \(h_S\equiv0\). Diese Konvention ist im Blatt nicht festgelegt. Wird die ursprüngliche Klasse auf nichtleere Rechtecke beschränkt, arbeiten wir ausdrücklich mit \(H_{\rm rect}\cup\{h_0\}\). Ihre VC-Dimension bleibt 4. Ein beliebig gewähltes nichtleeres Rechteck wäre kein Ersatz für die Inklusion \(R(S)\subseteq R^\star\).

## Teil 2.1: Warum ist das kleinste Rechteck ein ERM?

Sei \(P=\{i:y_i=1\}\). Für \(P\ne\varnothing\) definieren wir

\[
\widehat a_1=\min_{i\in P}x_{i,1},\qquad
\widehat a_2=\max_{i\in P}x_{i,1},
\]
\[
\widehat b_1=\min_{i\in P}x_{i,2},\qquad
\widehat b_2=\max_{i\in P}x_{i,2},
\quad
R(S)=[\widehat a_1,\widehat a_2]\times[\widehat b_1,\widehat b_2].
\]

Bei nur einem positiven Punkt entsteht ein entartetes Rechteck (ein Punkt); bei mehreren Punkten auf einer Geraden gegebenenfalls eine Strecke. Geschlossene, auch entartete Rechtecke sind zugelassen.

??? tip "Warum nur die positiven Punkte?"
    Alle positiven Punkte liegen im Zielrechteck. Ihr kleinstes umschließendes Rechteck liegt deshalb ebenfalls darin. Unter Realisierbarkeit kann darin kein negativ beschrifteter Trainingspunkt liegen.

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Alle positiven Trainingspunkte liegen in R(S)</summary>

Für jedes \(i\in P\) liegt jede Koordinate zwischen dem jeweiligen Minimum und Maximum. Also \(x_i\in R(S)\) und \(h_S(x_i)=1=y_i\).

**Begründung:** Definition von Minimum, Maximum und kartesischem Produkt.

**Intuition:** Das Rechteck wird genau so aufgespannt, dass es jeden positiven Trainingspunkt umfasst.
</details>
<details markdown="1"><summary>2. Das gelernte Rechteck liegt im Zielrechteck</summary>

Weil jeder positive Trainingspunkt in \(R^\star\) liegt, gilt

\[
a_1^\star\le\widehat a_1\le\widehat a_2\le a_2^\star,
\qquad
b_1^\star\le\widehat b_1\le\widehat b_2\le b_2^\star.
\]

Daraus folgt \(R(S)\subseteq R^\star\). Für \(P=\varnothing\) gilt diese Inklusion wegen unserer Konvention ebenfalls.

**Intuition:** Die Grenzen des inneren Rechtecks können nicht über die Grenzen des Zielrechtecks hinausragen.
</details>
<details markdown="1"><summary>3. Negative Trainingspunkte werden ebenfalls richtig klassifiziert</summary>

Aus \(y_i=0\) folgt \(x_i\notin R^\star\). Weil \(R(S)\subseteq R^\star\), gilt dann auch \(x_i\notin R(S)\). Also \(h_S(x_i)=0=y_i\).

Im Fall ohne positive Punkte sagt \(h_S\equiv0\) alle Trainingslabels richtig voraus.

**Intuition:** Ein Punkt außerhalb des äußeren Rechtecks kann nicht im inneren Rechteck liegen.
</details>
<details markdown="1"><summary>4. Null Fehler ist das Minimum</summary>

Alle Trainingspunkte sind korrekt klassifiziert. Daher

\[
L_S(h_S)=\frac1m\sum_{i=1}^m\mathbf1\{h_S(x_i)\ne y_i\}=0.
\]

Ein Verlust ist nichtnegativ. Somit erreicht \(h_S\) das kleinstmögliche empirische Risiko und ist eine ERM-Hypothese.

**Intuition:** Besser als keinen Trainingsfehler kann kein anderer Klassifikator sein. Die ERM-Hypothese muss dafür nicht eindeutig sein.
</details>
</div>

## Das Rechteck-Labor

<div class="tf-lab" data-tf-lab="rectangles"></div>
<noscript><p class="tf-noscript">Aktiviere JavaScript für die interaktive Geometrie. Alle Beweise bleiben im Text verfügbar.</p></noscript>

**Probiere aus:** Beginne mit sehr wenigen Punkten. Der Trainingsfehler bleibt null; der wahre Fehler kann dennoch groß sein. Erhöhe \(m\) bei unverändertem Seed. Das gelernte Rechteck enthält nun die alten und die zusätzlichen positiven Punkte. Unter dieser gekoppelten Stichprobe kann es nur wachsen; die Fehlerregion kann nur schrumpfen.

## Teil 2.2: Warum genügen vier getroffene Randstreifen?

Weil \(R(S)\subseteq R^\star\), macht der Algorithmus ausschließlich **falsch negative** Vorhersagen. Seine Fehlerregion ist

\[
E(S)=R^\star\setminus R(S),\qquad L_D(h_S)=D(E(S)).
\]

**Erster Fall:** Ist \(D(R^\star)\le\varepsilon\), dann folgt bereits

\[
L_D(h_S)=D(R^\star\setminus R(S))\le D(R^\star)\le\varepsilon.
\]

Wir müssen also nur \(D(R^\star)>\varepsilon\) untersuchen. Setze \(q=\varepsilon/4\).

### Anschauliche Konstruktion

Wähle links, rechts, unten und oben im Zielrechteck je einen Randstreifen \(B_i\) mit Masse \(q\), **sofern solche Streifen existieren**. Für eine Gleichverteilung im Einheitsquadrat ist ihre Masse ihre Fläche. Bei einer beliebigen Verteilung ist Masse dagegen nicht dasselbe wie Fläche.

Die vier Streifen sind vor dem Ziehen der Stichprobe durch \(D,R^\star,\varepsilon\) festgelegt. Sie sind Beweishilfen; der Lerner muss \(D\), \(R^\star\) und die Streifen nicht kennen.

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Ein linker Treffer begrenzt den linken Fehlerbereich</summary>

Sei \(B_L=R^\star\cap\{x:x_1\le t_L\}\). Gibt es einen positiven Trainingspunkt in \(B_L\), dann ist

\[
\widehat a_1\le x_{i,1}\le t_L.
\]

Jeder links vom gelernten Rechteck liegende Punkt erfüllt \(x_1<\widehat a_1\le t_L\). Der linke Fehlerbereich liegt also im linken Streifen und hat Masse höchstens \(q\).

**Intuition:** Ein Beobachtungspunkt nahe dem linken Rand zwingt die linke gelernte Grenze weit genug nach außen.
</details>
<details markdown="1"><summary>2. Dasselbe Argument gilt für alle vier Seiten</summary>

Ein rechter Treffer liefert \(\widehat a_2\ge t_R\), ein unterer \(\widehat b_1\le t_U\), ein oberer \(\widehat b_2\ge t_O\). Jeder der vier einseitigen Fehlerbereiche besitzt damit Masse höchstens \(q\).

**Begründung:** Minimum für untere Grenzen, Maximum für obere Grenzen; das Argument ist in beiden Koordinaten identisch.
</details>
<details markdown="1"><summary>3. Die gesamte Fehlerregion ist durch vier Teilbereiche überdeckt</summary>

Ein Punkt in \(R^\star\), der nicht in \(R(S)\) liegt, verletzt mindestens eine der vier Koordinatenbedingungen. Also

\[
E(S)\subseteq B_L\cup B_R\cup B_U\cup B_O.
\]

Mit der Subadditivität eines Wahrscheinlichkeitsmaßes folgt

\[
L_D(h_S)\le\sum_{i\in\{L,R,U,O\}}D(B_i)=4q=\varepsilon.
\]

**Intuition:** Die unbekannten Randbereiche können überlappen. Eine Summe zählt Überlappungen gegebenenfalls mehrfach; gerade deshalb ist sie eine obere Schranke und keine Gleichheit.
</details>
</div>

### Präzisierung für Punktmassen und beliebige Verteilungen

Das Blatt verlangt Streifen mit *exakt* \(q\) Masse. Das ist bei diskreten Verteilungen nicht immer möglich. Liegt beispielsweise die gesamte Masse auf einem Punkt, kann ein Streifen nur Masse 0 oder 1 haben. Ohne weitere Voraussetzung reicht die anschauliche Konstruktion deshalb noch nicht für einen verteilungsfreien Beweis.

Wir beheben das durch **Quantilgrenzen**. Die Trefferbereiche haben nun Masse **mindestens** \(q\); die bei einem Treffer verbleibenden Fehlerbereiche haben Masse **höchstens** \(q\).

??? info "Vollständiges Quantilargument – auch bei Atomen gültig"
    Definiere für die erste Koordinate das endliche Maß

    \[
    F(t)=D(R^\star\cap\{x:x_1\le t\}),\qquad
    t_L=\inf\{t:F(t)\ge q\}.
    \]

    Weil \(D(R^\star)>\varepsilon>q\) und das Zielrechteck beschränkt ist, ist die Menge nichtleer und das Quantil endlich. Die Rechtsstetigkeit von \(F\) und die Stetigkeit des Maßes von unten liefern

    \[
    D(R^\star\cap\{x_1\le t_L\})\ge q,
    \qquad
    D(R^\star\cap\{x_1<t_L\})\le q.
    \]

    Die erste Ungleichung folgt durch Annäherung an \(t_L\) von rechts. Für jedes \(s<t_L\) gilt \(F(s)<q\); Annäherung von links liefert die zweite Ungleichung.

    Wähle den **geschlossenen** Trefferbereich \(B_L=R^\star\cap\{x_1\le t_L\}\). Trifft die Stichprobe \(B_L\), dann ist \(\widehat a_1\le t_L\). Der links ausgelassene Bereich liegt deshalb in \(R^\star\cap\{x_1<t_L\}\) und hat Masse höchstens \(q\). Eine Punktmasse genau auf \(t_L\) ist im Trefferbereich enthalten, aber nicht in diesem offenen Fehlerbereich.

    Für die rechte Seite verwenden wir dasselbe Argument für die Zufallsgröße \(-x_1\); für unten und oben für \(x_2\) beziehungsweise \(-x_2\). So erhalten wir vier feste Bereiche \(B_i\) mit \(D(B_i)\ge q\). Wenn alle getroffen werden, hat jeder der vier einseitigen Fehlerbereiche Masse höchstens \(q\), und somit \(L_D(h_S)\le4q=\varepsilon\).

    Damit gilt die geometrische Aussage auch ohne Dichte- oder Stetigkeitsannahme. Die Trefferbereiche dürfen überlappen und können im Extremfall sogar identisch sein.

## Teil 2.3: Vom geometrischen Argument zur PAC-Garantie

Die Logik ist: **Wenn alle vier Bereiche getroffen werden, ist der Fehler klein.** Daher muss bei großem Fehler mindestens ein Trefferbereich leer sein. Dieses seltene Ereignis können wir abschätzen.

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Das schlechte Ereignis in eine Vereinigung einbetten</summary>

Definiere \(A_i=\{S:S\cap B_i=\varnothing\}\), wobei nur die Eingabepunkte der Stichprobe gemeint sind. Weil \(B_i\subseteq R^\star\), wäre jeder Punkt darin positiv. Aus Teil 2.2 folgt per Kontraposition

\[
\{S:L_D(h_S)>\varepsilon\}\subseteq A_L\cup A_R\cup A_U\cup A_O.
\]

**Intuition:** Ein großer Fehler kann nur entstehen, wenn der Algorithmus an mindestens einer Seite keine ausreichend randnahe positive Beobachtung erhält. Ein leerer Bereich allein erzwingt umgekehrt keinen großen Fehler.
</details>
<details markdown="1"><summary>2. Die Wahrscheinlichkeit eines leeren Bereichs abschätzen</summary>

Jeder Trainingspunkt verfehlt \(B_i\) mit Wahrscheinlichkeit \(1-D(B_i)\). Wegen der unabhängigen Ziehungen gilt

\[
\Pr(A_i)=(1-D(B_i))^m
\le(1-q)^m
\le e^{-qm}.
\]

**Begründung:** \(D(B_i)\ge q\), und \(1-u\le e^{-u}\) für \(u\ge0\). Es wird über sämtliche \(m\) Trainingspunkte gerechnet, nicht nur über die zufällige Anzahl positiver Beispiele.

**Intuition:** Eine Region mit nennenswerter Masse über viele unabhängige Versuche vollständig zu verpassen, wird exponentiell unwahrscheinlich.
</details>
<details markdown="1"><summary>3. Den Union Bound über die vier Seiten anwenden</summary>

\[
\Pr(L_D(h_S)>\varepsilon)
\le\Pr\!\left(\bigcup_i A_i\right)
\le\sum_i\Pr(A_i)
\le4e^{-m\varepsilon/4}.
\]

**Begründung:** Ereignisinklusion aus Schritt 1, Union Bound und die vier Abschätzungen aus Schritt 2.

**Intuition:** Es gibt vier Möglichkeiten, eine für den Beweis wichtige Seite zu verpassen. Die vier Ereignisse müssen nicht unabhängig sein.
</details>
<details markdown="1"><summary>4. Die Voraussetzung der Implikation annehmen und einsetzen</summary>

Nimm jetzt an, dass

\[
m\ge\frac4\varepsilon\ln\!\left(\frac4\delta\right).
\]

Multiplikation mit \(-\varepsilon/4<0\) liefert

\[
-\frac{m\varepsilon}{4}\le-\ln\!\left(\frac4\delta\right).
\]

Weil \(\exp\) monoton steigt, erhalten wir

\[
\Pr(L_D(h_S)>\varepsilon)
\le4e^{-m\varepsilon/4}
\le4e^{-\ln(4/\delta)}
=4\frac\delta4=\delta.
\]

**Intuition:** Die Voraussetzung wird genau an der Stelle eingesetzt, an der sie die zuvor bewiesene Schranke klein genug macht. Damit ist die Schlussfolgerung bewiesen.
</details>
</div>

!!! success "Ergebnis mit ganzzahligem m"
    Unter den beschriebenen Voraussetzungen genügt

    \[
    m\ge\left\lceil\frac4\varepsilon\ln\!\left(\frac4\delta\right)\right\rceil.
    \]

    Für \(\varepsilon=0{,}1\), \(\delta=0{,}05\) sind das \(\lceil40\ln80\rceil=176\) Beispiele. Die Garantie gilt für jedes \(D\), nicht nur für die Verteilung im Labor.

## Theorie und Simulation

<div class="tf-lab" data-tf-lab="pac"></div>

**Arbeitsauftrag:** Starte bei \(m=40\), \(\varepsilon=0{,}1\), \(\delta=0{,}05\). Vergleiche den simulierten Anteil schlechter Modelle mit der theoretischen oberen Schranke. Setze anschließend \(m\) auf die Garantieschwelle und simuliere erneut.

Die Simulation verwendet stets unabhängige gleichverteilte Punkte im Einheitsquadrat und das im Rechteck-Labor angegebene feste Ziel. Für jede Trainingsstichprobe wird der wahre Fehler unter **dieser** Verteilung exakt über Flächen berechnet. Erst der Anteil schlechter Trainingsstichproben ist eine Monte-Carlo-Schätzung. Es wird also keine zweite, zufällige Teststichprobe verwendet.

Die Exponentialschranke und \(4(1-\varepsilon/4)^m\) sind im Diagramm bei 1 abgeschnitten. Sie bleiben verteilungsfreie obere Schranken; sie müssen den empirischen Verlauf nicht eng treffen.

## Was ist der Sinn der Aufgabe?

Die Rechteckklasse enthält unendlich viele Hypothesen, weil ihre Grenzen reelle Zahlen sind. Der endliche Union Bound mit Faktor \(|H|\) wäre hier unbrauchbar. Trotzdem kann man die Fehlerkontrolle auf **vier geometrische Ereignisse** reduzieren. Entscheidend ist die Struktur der Klasse, nicht allein ihre Anzahl.

Der VC-Bonus macht diesen Gedanken abstrakter: Rechtecke können bestimmte endliche Punktmengen frei beschriften, aber nicht beliebig große. Genau diese begrenzte Ausdrucksstärke ermöglicht allgemeine Lerngarantien.

## Selbstkontrolle und typische Fehler

<div class="tf-quiz"><p><strong>Ein Randstreifen enthält keinen Trainingspunkt. Muss der wahre Fehler größer als ε sein?</strong></p><button data-correct="false" data-feedback="Bewiesen wurde nur: großer Fehler ⇒ mindestens ein leerer Streifen. Die Umkehrung wurde nicht bewiesen und ist im Allgemeinen falsch.">Ja, denn sonst wäre der Streifen getroffen.</button><button data-correct="true" data-feedback="Vier Treffer sind hinreichend für kleinen Fehler. Ein verfehlter Streifen kann selbst wenig zusätzlichen Fehler verursachen; der Gesamtfehler kann weiterhin klein sein.">Nein, der Fehler kann trotzdem höchstens ε sein.</button><p class="feedback" role="status" aria-live="polite"></p></div>

- **Fehlerfläche und Fehlermasse verwechseln:** Nur bei passender Gleichverteilung entspricht Fläche der Wahrscheinlichkeit.
- **Exakt gleiche Streifenmassen für jedes D voraussetzen:** Bei Atomen benötigt man das Quantilargument.
- **Unabhängigkeit der vier Ereignisse behaupten:** Der Union Bound braucht sie nicht.
- **Den leeren Positivdatensatz ignorieren:** Der Lerner benötigt eine explizite Ausgabe für diesen Fall.
- **Empirisch gute Ergebnisse als Beweis verwenden:** Sie betreffen eine gewählte Verteilung und endlich viele Wiederholungen.

<label class="progress-toggle"><input type="checkbox" data-progress="sheet01-ex2">Ich kann die drei Teile zu einer vollständigen PAC-Garantie verbinden.</label>

## Quellen und Einordnung

`exercises.pdf`, Aufgabe 2.1–2.3, PDF-Seite 1; Shalev-Shwartz/Ben-David, Aufgabe 2.3, Buchseiten 20–21 / PDF-Seiten 36–37. Das Union-Bound-Argument folgt dem Rahmen von Kapitel 2.3 und `VL.pdf`, PDF-Seiten 40–45. Fallunterscheidung, Leermengen-Konvention, Quantilpräzisierung, Erläuterungen und Simulationen sind eigene Ausarbeitungen; sie sind keine zitierte offizielle Musterlösung.

[Weiter zum VC-Bonus →](vc-dimension.md){ .tf-btn }
