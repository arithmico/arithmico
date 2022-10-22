Eine vollständige Liste aller verfügbaren Standardfunktionen findet man unter dem Menüpunkt „Hilfe“.

Für die folgenden Beispiele gilt:
* Die Eingaben beziehen sich auf ein leeres, fokussiertes Eingabefeld mit Schreibmarke (STRG + ALT + i). 
* Alle Eingaben müssen mit ENTER abgeschlossen werden.
* Bei Ein- und Ausgaben wird von folgenden Einstellungen ausgegangen:  
 Signifikante Stellenzahl: 6  
Sprache: DE  
Zahlenformat: DE (Dezimalkomma, Trennzeichen für Funktionsparameter ist das Semikolon ; ).

## 1 Symbolische Konstanten

### 1.1 Kreiszahl $\pi$
Für die Kreiszahl $\pi = 3,14159...$ kann die Buchstabenfolge ```pi``` als Konstantenbezeichner verwendet werden.

#### Beispiel 1.1.1 $\pi$ soll näherungsweise als Dezimalzahl ausgegeben werden 
```arithmico
pi
3,14159
```
#### Beispiel 1.1.2 $2 \pi = ?$
```arithmico
2*pi
6,28319
```

#### 1.2 Euler'sche Zahl e
Für die Euler'sche Zahl 2,71828... kann der Buchstabe ```e``` als Konstantenbezeichner verwendet werden.


#### Beispiel 1.2.1 e näherungsweise als Dezimalzahl ausgeben
```arithmico
e
2,71828
```

#### Beispiel 1.2.2	$e^{1,38629} =?$
```arithmico
e^1,38629
3,999983
```

## 2 Einfache Rechnungen und Standardfunktionen

### 2.1 KlaPoPuStri-Regel

#### Beispiel 2.1.1 
Der MathExplorer beachtet die Vorfahrtsregel "Klammer vor Potenz vor Punkt vor Strich" (KlaPoPuStri-Regel), Operatoren der gleichen Hierarchiestufe werden von links nach rechts bearbeitet. Als mathematische Klammern werden ausschließlich runde Klammern ( ) akzeptiert.  
``` arithmico
2+3*(4+5)^2
245 
```

#### Beispiel 2.1.2
```arithmico
(4,31+8,3)/(3,26-2,5)
16,592105
```

### 2.2 Quadratwurzel von x
__sqrt(x)__	Quadratwurzel von x.
Dabei ist x ist eine nicht-negative Zahl.

#### Beispiel 2.2.1	Quadratwurzel aus 25
$\sqrt{25} = ?$   
```arithmico
sqrt(25)     
5
```

### 2.3 n-te Wurzel von x
__root(x; n)__	n-te Wurzel von x.
Dabei sind der Radikand x und der Wurzelexponent n nicht-negative Zahlen.

#### Beispiel 2.3.1	Dritte Wurzel aus 8
$ \sqrt[3]{8} = ? $ (wird von penwriter nicht korrekt gerendert)
```arithmico
root(8;3)
2
```

#### Beispiel 2.3.2	Die 1,5-te Wurzel aus 0,008
$\sqrt[1,5]{0,008} = ? $ (wird von penwriter nicht korrekt gerendert)  
```arithmico
root(0,008;1,5)
0,04
```

### 2.4 Logarithmus von x zur Basis b
__log(x; b)__	Logarithmus von x zur Basis b. 
Dabei sind x und b positive Zahlen.
#### Beispiel 2.4.1 Logarithmus von 1000 zur Basis 10
$\log_{10}(1000) = ?$   
```arithmico
log(1000;10)
3
```

#### Beispiel 2.4.2 Logarithmus von 32 zur Basis 2
$\log_2(32) = ?$    
```arithmico
log(32;2)
5
```

#### Beispiel 2.4.3 Logarithmus von 1,25 zur Basis 0,8 
$\log_{0,8}(1,25) = ?$   
```arithmico
log(1,25;0,8)
-1
```

### 2.5 Dekadischer und natürlicher Logarithmus
__lg(x)__	Logarithmus von x zur Basis 10 (Zehner-Logarithmus). Dabei ist x eine positive Zahl.

__ln(x)__	Logarithmus von x zur Basis e (natürlicher Logarithmus). Dabei ist x eine positive Zahl.

#### Beispiel 2.5.1 $lg(1000) =?$ 
```arithmico
lg(1000)
3
```

#### Beispiel 2.5.2 $ln(4) =?$ (siehe Beispiel 1.2.2)
```arithmico
ln(4)
1,386294
```

#### Beispiel 2.5.3	$ln(e^2) =?$
```arithmico
ln(e^2)
2
```

### 2.6 Sinus von Winkel im Gradmaß
__sin(x)__	Sinus von x   
In den Einstellungen als Winkelmaß „Gradmaß“ wählen.


#### Beispiel 2.6.1	Sinus von 30° (degree)
```arithmico
sin(30)
0,5
```

#### Beispiel 2.6.2 Sinus von -270° (degree)
```arithmico
sin(-270)
1
```

### 2.7 Tangens von Winkel im Gradmaß
__tan(x)__	Tangens von x   
In den Einstellungen als Winkelmaß „Gradmaß“ wählen.

#### Beispiel 2.7.1	Tangens von 135° (degree)
```arithmico
tan(135)
-1
```

### 2.8 Arkussinus im Gradmaß ausgeben
__asin(x)__	Arkussinus von x   
Dabei ist x eine Zahl aus dem Intervall [-1; 1].   
In den Einstellungen als Winkelmaß „Gradmaß“ wählen.

#### Beispiel 2.8.1	$\arcsin(0,5)$ im Gradmaß (degree) = ?
```arithmico
asin(0,5)
30
```

#### Beispiel 2.8.2 $\arcsin(1)$ im Gradmaß (degree)=?
```arithmico
asin(1)
90
```

### 2.9 Kosinus von einem Wert im Bogenmaß
__cos(x)__	Kosinus von x   
In den Einstellungen als Winkelmaß „Bogenmaß“ wählen.

#### Beispiel 2.9.1	$cos(\frac{4}{3} \pi)$ 
```arithmico
cos(4/3*pi)
-0,5
```

### 2.10 Arkuskosinus Wert im Bogenmaß ausgeben
__acos(x)__	Arkuskosinus von x. Dabei ist x eine Zahl aus dem Interval [-1; 1]   
In den Einstellungen als Winkelmaß „Bogenmaß“ wählen.


#### Beispiel 2.10.1 $arccos(-0,5)$ im Bogenmaß =? 
```arithmico
acos(-0,5)
2,09395
```

### 2.11 Hyperbelsinus und Hyperbelkosinus
__sinh(x)__	Sinus hyperbolicus von x

__cosh(x)__	Kosinus hyperbolicus von x

#### Beispiel 2.11.1	$sinh(1) + cosh(1) =?$
```arithmico
sinh(1) + cosh(1)
2,718282
```

### 2.12 n! - Fakultät einer Zahl n
__fact(n)__	Fakultät von n, also  $n\:! = 1 \cdot 2 \cdot 3 \cdot ... \cdot n$  
Dabei ist $n \in \N_0$ .

#### Beispiel 2.12.1 $6 \:! =?$
```arithmico
fact(6)
720
```

### 2.13 |x| - Betrag einer Zahl x
__abs(x)__	Betrag von x, also $|x| = x$ für $x \ge 0$ und $|x| = -x$ für $x \lt 0$.

#### Beispiel 2.13.1 $|-3,215|=?$
```arithmico
abs(-3,215)
3,215
```

### 2.14 Maximum bzw. Minimum einer Werteliste
__max(x1; x2; x3; ...)__ Maximum der Werte $x_1, x_2, x_3, ...$

__min(x1; x2; x3; ...)__ Minimum der Werte $x_1, x_2, x_3, ...$

#### Beispiel 2.14.1 Gesucht ist der größte Wert in der Liste 2,745; -0,3155; 2,746; -1,84; 0,0002
```arithmico
max(2,745; -0,3155; 2,746; -1,84; 0,0002)
2,746
```

#### Beispiel 2.14.2 Gesucht ist der kleinste Wert in der Liste 2,745; -0,3155; 2,746; -1,84; 0,0002
```arithmico
min(2,745; -0,3155; 2,746; -1,84; 0,0002)
-1,84
```

### 2.15 Einen Bruch kürzen
__fraction(x)__	Kürzt den Bruch x

#### Beispiel 2.15.1 Kürze den Bruch $\frac{3}{6}$
```arithmico
fraction(3/6)
1 / 2
```


