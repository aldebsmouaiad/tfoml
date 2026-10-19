<p class="eyebrow">Werkzeugkasten / Notation</p>

# Was ist fest, was ist zufällig?

Viele Schwierigkeiten in Lerntheorie entstehen, weil mehrere Zufallsebenen gleichzeitig auftreten. Diese Übersicht gilt für das realisierbare binäre Klassifikationsmodell von Blatt 01.

| Symbol | Definition / Rolle | Fest oder zufällig? |
|---|---|---|
| \(\mathcal X\) | Eingaberaum, z. B. \(\mathbb R^2\) | Fest |
| \(\mathcal Y=\{0,1\}\) | Labelraum | Fest |
| \(D\) | Unbekannte Verteilung der Eingaben | Fest, aber unbekannt |
| \(f\) | Zielfunktion | Fest, aber unbekannt |
| \(H\) | Zugelassene Hypothesenklasse | Vor dem Training festgelegt |
| \(S=((x_i,y_i))_{i=1}^m\) | Trainingsstichprobe, \(x_i\overset{\mathrm{iid}}\sim D\), \(y_i=f(x_i)\) | Zufällig |
| \(h_S=A(S)\) | Ausgabe des Lernalgorithmus | Zufällig durch \(S\) |
| \(x\sim D\) | Neues Eingabebeispiel | Neue Zufallsziehung |

## Empirischer Fehler

\[
L_S(h)=\frac1m\sum_{i=1}^m\mathbf1\{h(x_i)\ne y_i\}.
\]

Das ist ein Mittelwert über die beobachteten Trainingsdaten. Bei null Trainingsfehler gilt \(h(x_i)=y_i\) für jeden Trainingspunkt. Über andere Punkte sagt diese Feststellung allein noch nichts aus.

## Wahrer Fehler

\[
L_D(h)=\Pr_{x\sim D}(h(x)\ne f(x)).
\]

Dieser Wert bezieht sich auf ein neues Beispiel aus der gesamten Verteilung. Für ein festes \(h\) ist er eine feste Zahl. Für \(h_S\) hängt er von der zufälligen Trainingsstichprobe ab. \(L_D(h_S)\) ist deshalb selbst eine Zufallsvariable, obwohl das neue \(x\) bereits in der Definition durch eine Wahrscheinlichkeit zusammengefasst wurde.

## Die zwei Ebenen von PAC

\[
\Pr_{S\sim D^m}\!\left(L_D(h_S)>\varepsilon\right)\le\delta.
\]

**Innen:** Wie häufig macht das fertige Modell einen Fehler bei neuen Beispielen? Das ist \(L_D(h_S)\).

**Außen:** Wie häufig entsteht bei wiederholtem Ziehen einer Trainingsstichprobe ein Modell, dessen wahrer Fehler größer als \(\varepsilon\) ist?

Für \(\varepsilon=0{,}1\) und \(\delta=0{,}05\) lautet die Garantie: In mindestens 95 % der Trainingsläufe entsteht ein Modell mit Fehler höchstens 10 %. Sie behauptet weder, dass jeder Trainingslauf gut ist, noch dass das Modell nach jeder einzelnen Beobachtung eine 95-%-Wahrscheinlichkeit auf Korrektheit besitzt.

## ERM und Realisierbarkeit

Ein ERM-Lerner wählt

\[
h_S\in\operatorname*{arg\,min}_{h\in H}L_S(h).
\]

Realisierbarkeit bedeutet \(\exists h^\star\in H:L_D(h^\star)=0\). Bei sauber gezogenen Trainingsdaten erreicht daher eine Hypothese in \(H\) auch empirischen Fehler null, fast sicher. Jeder ERM-Minimierer erreicht dann ebenfalls null Trainingsfehler.

Ohne Realisierbarkeit kann das minimale empirische Risiko positiv sein. Die hier verwendeten Realisierbarkeitsbeweise dürfen deshalb nicht ohne Anpassung auf verrauschte Labels übertragen werden.

## Quantoren der Lerngarantie

Die relevante Aussage hat die Struktur: Für alle \(\varepsilon,\delta\in(0,1)\), alle zulässigen \(D\), alle realisierbaren Ziele und jede hinreichend große Stichprobe gilt die Wahrscheinlichkeitsaussage. Der Algorithmus benötigt dabei weder \(D\) noch die Zielfunktion als Eingabe.

Bei der Rechteck-Aufgabe sind die Randstreifen nur Hilfsmengen für den Beweis. Dass man sie im Beweis mithilfe des unbekannten \(D\) definiert, macht den Algorithmus nicht unzulässig: Der Algorithmus berechnet ausschließlich Minima und Maxima der beobachteten positiven Punkte.

## Drei Werkzeuge

| Werkzeug | Aussage | Voraussetzung |
|---|---|---|
| Union Bound | \(\Pr(\bigcup_i A_i)\le\sum_i\Pr(A_i)\) | Keine Unabhängigkeit der \(A_i\) nötig |
| Produktregel | Wahrscheinlichkeit von \(m\) unabhängigen Fehlversuchen ist \((1-p)^m\) | Unabhängige Versuche mit gleicher Trefferwahrscheinlichkeit \(p\) |
| Exponentialabschätzung | \(1-u\le e^{-u}\) | Für alle reellen \(u\); hier \(u\in(0,1)\) |

Die letzte Aussage folgt beispielsweise aus der Konvexität von \(e^x\): Der Graph liegt oberhalb seiner Tangente bei 0, also \(e^x\ge1+x\). Setze \(x=-u\).

**Quellen:** `VL.pdf`, PDF-Seiten 15–49 und 60–65; Shalev-Shwartz/Ben-David, Kapitel 2.1–2.3 und 3.1. Definitionen in konsistenter Notation und eigene Erläuterungen.
