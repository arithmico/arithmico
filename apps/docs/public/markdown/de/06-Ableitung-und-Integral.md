__nderive(f(x); x; g?)__ Ableitung der Funktion f an der Stelle x. Wird der Grad g nicht angegeben, wird die erste Ableitung berechnet.

### 8.1 Ableitung einer Polynomfunktion
#### Beispiel 8.1.1	Gegeben ist die Funktion $f(x) = x^2$. Berechne die 1. Ableitung an der Stelle 3, also $f '(3)$.
```arithmico
f(x) := x^2
(x: any) → x^2
``` 
```arithmico
nderive(f ; 3)
6
``` 
oder kürzer:

```arithmico
nderive((x)->(x^2); 3)
6
``` 

### 8.2 Ableitung der e-Funktion
#### Beispiel 8.2.1	Gegeben ist die Funktion $f(x) = e^x$. Berechne die 1. Ableitung an der Stelle 1, also $f '(1)$.
```arithmico
nderive((x)->e^x; 1)
2,718282
``` 
### 8.3 Ableitung der natürlichen Logarithmusfunktion
#### Beispiel 8.3.1	Berechne die 1. Ableitung der natürlichen Logarithmusfunktion $f(x) = ln(x)$ an der Stelle 4, also $f '(4)$.
```arithmico
nderive((x)->ln(x); 4)
0,25
``` 
### 8.4 Ableitung der Sinus-Funktion
#### Beispiel 8.4.1	Berechne die 1. Ableitung der Sinusfunktion $f(x) = \sin(x)$ an der Stelle $\frac{\pi}{4}$ , also $f '(\frac{\pi}{4})$
```arithmico
nderive((x)->sin(x); pi /4)
0,707107
``` 
# 9 Bestimmtes Integral
__nintegrate(f(x); u; v)__	Berechnet das bestimmte Integral der Funktion f mit Untergrenze u und Obergrenze v, also $\int_u^v f(x) dx$.
### 9.1 Bestimmtes Intral über einer Polynomfunktion
#### Beispiel 9.1.1	$\int_0^1 x^2 dx = ?$
```arithmico
nintegrate((x)->x^2; 0; 1)
0,333333
``` 
### 9.2 Bestimmtes Integral über einer trigonometrischen Funktion
#### Beispiel 9.2.1	$\int_0^\pi sin(x) dx =?$
```arithmico
nintegrate((x)->sin(x); 0; pi)
2
``` 
### 9.3 Bestimmtes Integral über einer Exponentialfunktion
#### Beispiel 9.3.1	$\int_0^1 e^x dx =?$
```arithmico
nintegrate((x)->e^x; 0; 1)
1,718282
``` 
#### Beispiel 9.3.2	$\int_0^\infty e^{-x} dx$ soll näherungsweise berechnet werden.  
Dazu wird die obere Integralgrenze mit $b = 20$ so gewählt, dass 
der Funktionswert $e^{-b} = e^{-20} = 2,06115 \cdot 10^{-9}$ dicht bei 0 liegt. 
```arithmico
nintegrate((x)->e^(-x);0;20)
1 
``` 
