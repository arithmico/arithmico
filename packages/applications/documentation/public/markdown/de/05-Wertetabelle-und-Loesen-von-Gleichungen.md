__table(f, u?, v?, w?)__ Gibt zu der Funktion $f$ eine Wertetabelle mit Wertepaaren $[x; f(x)]$ für  x-Werte aus dem Intervall $[u; v]$ aus. Dabei gibt w die Schrittweite der x-Werte an.

#### Beispiel 5.1 Gib für die Funktion f(x)=x^2 eine Wertetabelle für die x-Werte aus dem Intervall [-2; 3] mit der Schrittweite 1 aus.
```arithmico
f(x):=x^2
(x: any) → x^2
```
```arithmico
table(f; -2; 3; 1)
[[-2; 4]; [-1; 1]; [0; 0]; [1; 1]; [2; 4]; [3; 9]]
```

oder kurz:

```arithmico
table(x->x^2; -2; 3; 1)
[[-2; 4]; [-1; 1]; [0; 0]; [1; 1]; [2; 4]; [3; 9]]
``` 
## 6 Gleichung mit einer Unbekannten lösen
__nsolve(u; v?; w?)__ Löst die Gleichung u. Werden die Untergrenze v und die Obergrenze w nicht angegeben, werden die Lösungen im Intervall $[-20; 20]$ bestimmt.
### 6.1 Lineare Gleichung ohne Intervallangabe lösen
#### Beispiel 6.1.1	Berechne die Lösungen der Gleichung
$3x -5 = x +7$ im Intervall $[-20; 20]$.
```arithmico
nsolve(3*x -5 = x +7)
[6]
```
### 6.2 Quadratischen Gleichung ohne Intervallangabe
#### Beispiel 6.2.1	Berechne die Lösungen der Gleichung $2x^2 +4x -30 =0$ im Intervall $[-20; 20]$.
```arithmico
nsolve(2*x^2 +4*x -30 =0)
[-5; 3] 
``` 
Es gibt die Lösungen: $x_1 = -5$ und $x_2 =3$

#### Beispiel 6.2.2	Berechne die Lösungen der Gleichung $x^2 -x +0,25 =0$ im Intervall $[-20; 20]$.
```arithmico
nsolve(x^2 -x +0,25 =0)
[0,5] 
``` 
Es gibt nur eine Lösung: $x = 0,5$
#### Beispiel 6.2.3 Berechne die Lösungen der Gleichung $x^2 =-4$ im Intervall $[-20; 20]$.

```arithmico
nsolve(x^2 =-4)
[]  
``` 
Es gibt keine Lösung (leere Lösungsmenge).

### 6.3 Kubische Gleichung ohne Intervallangabe 
#### Beispiel 6.3.1	Berechne die Lösungen der Gleichung $x^3 +x^2 -17x +15 =0$ im Intervall $[-20; 20]$.
```arithmico
nsolve(x^3 +x^2 -17*x +15 =0)
[-5; 1; 3]
``` 
### 6.4 Lösen einer Gleichung mit Intervallangabe
#### Beispiel 6.4.1	Berechne die Lösungen der Gleichung $x -1 = 20$ mit nsolve zunächst ohne explizite Intervallangabe $[-20; 20]$.
```arithmico
nsolve(x-1 = 20)
[]
``` 
Die Lösung $x=21$ liegt außerhalb des Standardintervalls $[-20; 20]$. Daher wird hier die leere Menge als Lösungsmenge angezeigt.
#### Beispiel 6.4.2 Berechne die Lösungen der Gleichung $x -1=20$ im Intervall $[0; 30]$.
```arithmico
nsolve(x -1 =20; 0; 30)
[21]
``` 
Die Lösung $x=21$ liegt jetzt innerhalb des angegebenen Intervalls $[0; 30]$.
### 6.5 Nullstellen der Sinusfunktion im Intervall $[0; 7]$
#### Beispiel 6.5.1 Berechne die Nullstellen der Standard-Sinus-Funktion $\sin(x)$ im Intervall $[0; 7]$.
```arithmico
nsolve(sin(x)=0; 0; 7)
[0; 3,141593; 6,283185] 
``` 
Dies sind die Nullstellen $0$, $\pi$ und $2\pi$ im Intervall $[0; 7]$ (bei  Einstellung Winkelmaß=Bogenmaß) 
### 6.6 Nullstellen einer Exponentialfunktion
#### Beispiel 6.6.1 Berechne die Nullstellen der Funktion $f(x) = (x^2 -2x)\cdot e^{0,5 x}$ im Intervall $[-20; 20]$.

```arithmico
nsolve((x^2 -2*x)*e^(0,5*x)=0) 
[0; 2]
``` 
### 6.7 Lösungen einer Exponentialgleichung
#### Beispiel 6.7.1	Berechne die Lösungen der Gleichung $10e^{0,1 t} = 50 -40 e^{-0,1 t}$ im Intervall $[-20; 20]$.
```arithmico
nsolve(10*e^(0,1*t) = 50-40*e^(-0,1*t)) 
[0; 13,862944]  
``` 
### 6.8 Nullstellen einer rationalen Funktion
#### Beispiel 6.8.1	Berechne die Nullstellen der Funktion $f(x) = \frac{(x+2)^2}{x-1}$ im Intervall  $[-20; 20]$.
```arithmico
nsolve((x+2)^2/(x-1)=0) 
[-2]
``` 
## 7 Lineares Gleichungssystem (LGS) lösen
__lsolve(u; v; ...)__ Löst ein System von linearen Gleichungen mit den Gleichungen u, v, ... Das LGS muss eindeutig lösbar sein. Die Anzahl der Gleichungen muss mit der Anzahl der Unbekannten übereinstimmen.
### 7.1 LGS mit zwei Gleichungen und zwei Unbekannten
#### Beispiel 7.1.1	Berechne die Lösungen des LGS
I: &nbsp; x+y =5   
II: 2x -y =1   

```arithmico
lsolve(x +y =5; 2*x -y =1) 
[x = 2; y = 3]
``` 
### 7.2 LGS mit drei Gleichungen und drei Unbekannten
#### Beispiel 7.2.1	Berechne die Lösungen des LGS
I: &nbsp; z +y +x = 4   
II:  2x +2z = y-1   
III: x = z+3

```arithmico
lsolve(z +y +x =4; 2*x +2*z =y-1; x = z+3)
[z = -1; y = 3; x = 2]
``` 
