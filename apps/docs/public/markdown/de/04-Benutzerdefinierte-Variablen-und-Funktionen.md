Im Arithmico können benutzereigene Variablen für Zahlenwerte und Funktionen definiert und anschließend verwendet werden. Dafür gelten folgende Regeln: 
1. Die Bezeichner für benutzereigene Variablen oder Funktionen beginnen mit einem Buchstaben. Es können weitere Buchstaben, Ziffern oder Unterstriche (\_) folgen (ohne Leerzeichen dazwischen).
2. 	Die Groß- und Kleinschreibung ist relevant, d.h. a (klein geschrieben) ist nicht gleich A (groß geschrieben). 
3. Die Bezeichner für vordefinierte Konstanten (```pi```, ```e```, ...) sollten nicht für selbstdefinierte Bezeichner verwendet werden, da die Konstantenbezeichner sonst überschrieben werden. Dies gilt auch für Funktionen, weil diese dadurch rekursiv definiert werden.
4. Der Multiplikationsoperator muss immer verwendet werden - auch zwischen zwei Variablen (```a*b``` statt ```ab```) oder zwischen einem Zahlenwert und einer Variablen (```2*x``` statt ```x```).
5. Bevor eine selbstdefinierte Variable in einem Rechenausdruck verwendet werden kann, muss ihr zuvor mit dem Zuweisungsoperator ```:=``` ein konstanter Zahlenwert zugewiesen worden sein. Eine Variable behält ihren Wert so lange, bis ihr mit ```:=``` ein neuer Wert zugewiesen wird.
6. Den aktuellen Wert einer Variablen erhält man, indem man ihren Namen ins Eingabefeld schreibt. Eine Liste aller definierten Variablen- und Funktionsbezeichner ist über die Schaltfläche „Zeige Definitionen“ verfügbar. Es ist nicht möglich, einzelne Variable zu löschen.
### 3.1 Variable definieren und verwenden
#### Beispiel 3.1.1	Der Variablen a wird der Wert 3 und der Variablen b der Wert 1/2 zugewiesen. Anschließend wird mit beiden gerechnet. 
```arithmico
a:=3
3
```
```arithmico
b:=1/2
0,5
```
```arithmico
2*a - a*b 
4,5
```

### 3.2 Liste aller aktuell verwendeten Variablen
Eine Liste aller aktuell verwendeten Variablen und Funktionen erhält man über die Schaltfläche  „Zeige Definitionen“.
### 3.3 Wert einer Variablen überschreiben
#### Beispiel 3.3.1	Nachdem die Variablen a und b wie in 3.1 definiert wurden, soll a nun den Wert 5 erhalten.  Anschließend wird wieder mit beiden gerechnet. 
```arithmico
a:=5
5
```
```arithmico
2*a - a*b 
7,5
```
### 3.4 Alle Variablen löschen
Mit der Schaltfläche „Definitionen löschen“ werden alle benutzerdefinierten Variablen und Funktionsdefinitionen gelöscht.
## 4 Benutzerdefinierte Funktionen
Für die Bezeichner benutzerdefinierter Funktionen gelten die gleichen Schreibregeln wie für Variablen. Zusätzlich gilt hier:
1. An den Namen des Funktionsbezeichners wird in runden Klammern eine Liste mit (formalen) Parametern angehängt in der Form ```f(x; y; z)```. Die Liste kann auch nur ein Element enthalten, also die Form f(x) besitzen. Zwischen dem Funktionsnamen und der öffnenden Klammer darf kein Leerzeichen stehen.
2. Mit dem Zuweisungsoperator ```:=``` wird anschließend ein Ausdruck (Funktionsterm) mit den Parametern x, y, ... zugewiesen. 
3. Danach kann der Funktionsbezeichner gefolgt von runden Klammern mit konkreten Zahlen als Funktionsargumenten verwendet werden. Die Anzahl der Argumente muss mit der Anzahl der Parameter übereinstimmen.
4. Funktionen können auch ohne Angabe eines Funktionsbezeichners mit dem Operator ```->``` definiert werden. Beispiel Quadratfunktion: ```x -> x^2``` (siehe auch 5., 8.1 bzw. 9.1).
### 4.1 Funktion definieren und verwenden
#### Beispiel 4.1.1	Die Funktion $f(x) = x^2 -2x$ wird definiert. Anschließend werden die Funktionswerte für verschiedene x-Werte ausgegeben.
```arithmico
f(x):=x^2 -2*x
(x: any) → x^2 - 2 * x
```
```arithmico
f(1)
-1
```
```arithmico
f(2)
0
```
```arithmico
f(2,5)
1,25
```
#### Beispiel 4.1.2	Die Funktionswerte der Polynomfunktion 
$f(x)= x^3 -4x^2 +3$ sollen nacheinander an den Stellen $x=-1$, $x=0$, $x=1$ und $x=2$ berechnet werden.
```arithmico
f(x):=x^3 -4*x^2 +3
(x: any) → x^3 - 4 * x^2 + 3
``` 
```arithmico
f(-1)
-2
``` 
```arithmico
f(0)
3
``` 
```arithmico
f(1)
0
``` 
```arithmico
f(2)
-5
```
#### Beispiel 4.1.3	Die Funktion $A(x,y) = x \cdot y$ wird definiert, um den Flächeninhalt eines Rechtecks mit den Seitenlängen x und y zu berechnen. Anschließend wird die Funktion mit verschiedenen Argumenten aufgerufen.
```arithmico
A(x;y):=x*y
(x: any; y: any) → x * y
``` 
```arithmico
A(4;5)
20
``` 
```arithmico
a:=1/2
0,5
``` 
```arithmico
A(3;a)
1,5
``` 
### 4.2 Funktionswerte einer Sinusfunktion
#### Beispiel 4.2.1	Von der Funktion $f(t) =2 sin(t-\frac{1}{2} \pi)$ sollen nacheinander die Funktionswerte $f(0)$, $f(\frac{1}{3} \pi)$ und $f(\frac{1}{2} \pi)$ ausgegeben werden. 
```arithmico
f(t):=2*sin(t-1/2*pi) 
(t: any) → 2 * sin(t - 1 / 2 * pi)
``` 
```arithmico
f(0)
-2
``` 
```arithmico
f(1/3*pi)
-1
``` 
```arithmico
f(1/2*pi)
0
``` 

### 4.3 Funktionswerte einer Exponentialfunktion
#### Beispiel 4.3.1	Berechne nacheinander für die Funktion $K(n)=1000 \cdot 1,05^n$ die Funktionswerte $K(0)$, $K(1)$ und $K(2)$
```arithmico
K(n):=1000*1,05^n 
(n: any) → 1000 * 1,05^n
``` 
```arithmico
K(0)
1000
``` 
```arithmico
K(1)
1050
``` 
```arithmico
K(2)
1102,5
``` 
