<p class="eyebrow">Blatt 01 / Aufgabe 2.4 · Bonus</p>

# Warum die VC-Dimension genau 4 ist

**Originalauftrag:** Zeige \(\operatorname{VCdim}(H_{\mathrm{rect}})=4\). Quelle: `exercises.pdf`, Bonus zu Aufgabe 2, PDF-Seite 1.

## Was bedeutet „shattern“?

Eine endliche Punktmenge \(C=\{c_1,\ldots,c_n\}\) wird von \(H\) **geshattert** (zerlegt), wenn für **jede** der \(2^n\) binären Beschriftungen ein \(h\in H\) existiert, das genau diese Labels auf \(C\) erzeugt.

\[
\forall(y_1,\ldots,y_n)\in\{0,1\}^n\quad
\exists h\in H\quad\forall i:\ h(c_i)=y_i.
\]

Es muss nicht dasselbe Rechteck für alle Beschriftungen funktionieren. Die Punktmenge bleibt fest; das Rechteck darf sich mit den Labels ändern.

Die VC-Dimension ist die größte Größe einer geshatterten Punktmenge, sofern diese Größen beschränkt sind. Für den Wert 4 brauchen wir zwei verschiedene Beweisrichtungen:

| Untere Schranke | Obere Schranke |
|---|---|
| Es **existiert** eine Vier-Punkte-Menge, deren **alle** Beschriftungen realisierbar sind. | Für **jede** Fünf-Punkte-Menge **existiert** mindestens eine nicht realisierbare Beschriftung. |
| \(\operatorname{VCdim}\ge4\) | \(\operatorname{VCdim}\le4\) |

## Das Beschriftungs-Labor

<div class="tf-lab" data-tf-lab="vc"></div>
<noscript><p class="tf-noscript">Aktiviere JavaScript, um die Beschriftungen interaktiv zu wechseln. Die Konstruktionen stehen auch im folgenden Beweis.</p></noscript>

**Probiere aus:** Durchlaufe alle 16 Beschriftungen der vier Extrempunkte. Wechsle dann zum Fünf-Punkte-Beispiel: Die äußeren Punkte sind positiv, der Mittelpunkt negativ. Warum hilft kein größeres oder kleineres Rechteck?

## Untere Schranke: Vier Punkte lassen sich shattern

Wähle

\[
C=\{(-1,0),(1,0),(0,-1),(0,1)\}.
\]

Im Labor ist diese Anordnung nur verschoben und skaliert. Jeder Punkt ist ein **eindeutiger Extrempunkt**: ganz links, ganz rechts, ganz unten oder ganz oben.

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Eine beliebige Beschriftung wählen</summary>

Sei \(P\subseteq C\) die Menge der positiv beschrifteten Punkte. Wenn \(P\ne\varnothing\), wähle das kleinste geschlossene achsenparallele Rechteck um \(P\).

**Begründung:** Die Koordinatenminima und -maxima einer nichtleeren endlichen Menge existieren. Jeder positive Punkt wird eingeschlossen.
</details>
<details markdown="1"><summary>2. Jeder negative Punkt bleibt draußen</summary>

Sei zum Beispiel der linke Punkt \((-1,0)\) negativ. Alle übrigen Punkte haben erste Koordinate mindestens 0. Ein Rechteck, dessen linke Grenze das Minimum der positiven ersten Koordinaten ist, hat deshalb linke Grenze mindestens 0 und schließt \((-1,0)\) aus.

Dasselbe Argument gilt für den rechten, unteren und oberen Punkt mit seiner jeweils eindeutigen Extremkoordinate.

**Intuition:** Jeder Punkt besitzt eine Richtung, in der er allein außen liegt. Wird er negativ beschriftet, kann diese Seite des Rechtecks nach innen rücken.
</details>
<details markdown="1"><summary>3. Den leeren Positivfall behandeln und quantifizieren</summary>

Für \(P=\varnothing\) genügt der Null-Klassifikator. Auch in der Klasse ohne leeres Rechteck kann man ein kleines Rechteck weit entfernt von \(C\) wählen.

Damit ist jede beliebige Beschriftung von \(C\) realisierbar. Also wird diese Vier-Punkte-Menge geshattert, und \(\operatorname{VCdim}(H_{\rm rect})\ge4\).
</details>
</div>

## Obere Schranke: Keine fünf Punkte lassen sich shattern

Hier reicht das Bild mit einem Mittelpunkt **nicht**. Wir müssen jede Anordnung von fünf verschiedenen Punkten behandeln.

<div class="tf-proof" markdown="1">
<details markdown="1"><summary>1. Eine beliebige Fünf-Punkte-Menge und ihre Extrempunkte wählen</summary>

Sei \(C\subset\mathbb R^2\) beliebig mit \(|C|=5\). Wähle je einen Punkt mit minimaler und maximaler erster Koordinate sowie minimaler und maximaler zweiter Koordinate. Nenne die Menge der gewählten Punkte \(Q\).

Es gilt \(|Q|\le4\), denn derselbe Punkt kann mehrere Extremrollen übernehmen. Bei Gleichständen wählst du jeweils einen beliebigen Extrempunkt. Es bleibt mindestens ein Punkt \(z\in C\setminus Q\).
</details>
<details markdown="1"><summary>2. Eine unmögliche Beschriftung konstruieren</summary>

Beschrifte die Punkte aus \(Q\) positiv und alle übrigen Punkte negativ. Jedes achsenparallele Rechteck, das alle Punkte aus \(Q\) enthält, muss in jeder Koordinate mindestens vom globalen Minimum bis zum globalen Maximum der gesamten Menge \(C\) reichen.

Deshalb enthält es ganz \(C\), insbesondere den negativ beschrifteten Punkt \(z\). Es kann diese Beschriftung also nicht realisieren.

**Intuition:** Die ausgewählten Extrempunkte spannen bereits den vollständigen Begrenzungsrahmen aller fünf Punkte auf. Für einen weiteren negativen Punkt innerhalb dieses Rahmens bleibt kein Ausweg.
</details>
<details markdown="1"><summary>3. Die allgemeine obere Schranke und das Ergebnis schließen</summary>

Da \(C\) beliebig war, kann keine Fünf-Punkte-Menge geshattert werden. Eine größere geshatterte Menge würde auch jede ihrer Fünf-Punkte-Teilmengen shattern: Man könnte deren gewünschte Labels beliebig auf die größere Menge ergänzen. Daher kann auch keine größere Menge geshattert werden.

Es folgt \(\operatorname{VCdim}(H_{\rm rect})\le4\). Zusammen mit der unteren Schranke erhalten wir

\[
\boxed{\operatorname{VCdim}(H_{\rm rect})=4.}
\]
</details>
</div>

## Warum ist das wichtig?

Die Klasse ist unendlich groß, hat aber endliche VC-Dimension. Im klassischen binären PAC-Rahmen mit den üblichen Messbarkeitsvoraussetzungen ist endliche VC-Dimension das entscheidende Kriterium für verteilungsfreie Lernbarkeit. Aufgabe 2 hat eine konkrete Lernregel und eine direkte Schranke für diese Klasse geliefert; der VC-Begriff ordnet das Ergebnis in eine allgemeinere Theorie ein.

Dass ein Rechteck vier reelle Parameter hat, passt hier zum Ergebnis. **Die Anzahl der Parameter ist aber kein allgemeiner Beweis für die VC-Dimension.** Die zwei geometrischen Argumente sind notwendig.

## Selbstkontrolle

<div class="tf-quiz"><p><strong>Was fehlt, wenn du nur eine nicht shatterbare Fünf-Punkte-Anordnung gezeigt hast?</strong></p><button data-correct="true" data-feedback="Für VCdim ≤ 4 muss jede Fünf-Punkte-Menge ausgeschlossen werden. Ein einzelnes Gegenbeispiel sagt nicht, ob eine andere Anordnung vielleicht geshattert wird.">Der Beweis für jede beliebige Fünf-Punkte-Menge.</button><button data-correct="false" data-feedback="Die Aussage über eine einzige Anordnung hat den falschen Quantor. Auch viele Bilder ersetzen die allgemeine Extrempunktkonstruktion nicht.">Nichts; eine Anordnung reicht für die obere Schranke.</button><p class="feedback" role="status" aria-live="polite"></p></div>

<label class="progress-toggle"><input type="checkbox" data-progress="sheet01-vc">Ich kann beide Quantorenrichtungen und die Extrempunktkonstruktion erklären.</label>

## Quellen

`exercises.pdf`, Aufgabe 2.4, PDF-Seite 1. Shalev-Shwartz/Ben-David, *Understanding Machine Learning*, Definition 6.5 und Kapitel 6.3.3, Buchseiten 46–47 / PDF-Seiten 62–63. `VL.pdf`, PDF-Seiten 180–185, zum Begriff und den zwei Beweisrichtungen. Text und interaktive Konstruktion sind eigenständige Ausarbeitungen.
