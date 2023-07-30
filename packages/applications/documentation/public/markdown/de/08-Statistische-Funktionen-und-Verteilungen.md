### 12.1 Binomialkoeffizient $n \choose k$
__binco(n ; k)__	Berechnet den Binominalkoeffizient  ${n \choose k}$ „n über k“
#### Beispiel 12.1.1	Berechne den Binomialkoeffizient ${6 \choose 2}$.
```arithmico
binco(6; 2)
15
``` 
### 12.2 Binomialverteilung B(n ; p ; k)
__binom(n ; p ; k)__ Binomialverteilung mit den Parametern n = Anzahl der Stufen des mehrstufigen Zufallsversuchs, p =Trefferwahrscheinlichkeit, 
k = Trefferanzahl
#### Beispiel 12.2.1 Berechne B(6 ; 0,5 ; 2) = P(X=2) mit n=6; p=0,5 und k=2, X binomialverteilt.
```arithmico
binom(6; 0,5; 2)
0,234375
``` 
### 12.3 Kumulierte Binomialverteilung F(n ; p ; k)
__cbinom(n; p; k)__	Kumulierte Binomialverteilung mit 
n = Anzahl der Stufen des mehrstufigen Zufallsversuchs,
p =Trefferwahrscheinlichkeit, k = Trefferanzahl
#### Beispiel 12.3.1 Berechne F(1000 ; 0,45 ; 421) = P(X<=421) mit n=1000, p=0,45 und k=421, X binomialverteilt.
```arithmico
cbinom(1000; 0,45; 421)
0,034811
``` 
### 12.4 Kumulierte Binomialverteilung 1 - F(n ; p ; k)
#### Beispiel 12.4.1 Berechne  1 - F(1000 ; 0,45 ; 421) = P(X > 421) mit n=1000 und p=0,45, k=421, X  binomialverteilt
```arithmico
1 - cbinom(1000; 0,45; 421)
0,965189
``` 
### 12.5 Gauß'sche Dichtefunktion $\varphi(x)$ (Standardnormalverteilung) 
__normal(x)__ Standardnormalverteilung mit Erwartungswert 0 und Varianz 1.
#### Beispiel 12.5.1 Berechne $\varphi(0)$ mithilfe der Definition der Dichtefunktion $\varphi(x) = \frac{1}{\sqrt{2\pi}} \cdot e^{-0,5 \cdot x^2}$ 
```arithmico
phi(x):=1/ sqrt(2*pi) *e^(-0,5*x^2)
(x: any) → 1 / sqrt(2 * pi) * e^(-0,5 * x^2)
``` 
```arithmico
phi(0)
0,398942
``` 
#### Bespiel 12.5.2	Berechne $\varphi(0)$ mithilfe des Befehls normal(x) (Standardnormalverteilung)
```arithmico
normal(0)
0,398942
``` 
### 12.6 Gauß'sche Integralfunktion $\Phi(z)$ (Kumulierte Standardnormalverteilung)
__cnormal(z)__	Kumulierte Standardnormalverteilung mit Erwartungswert 0 und Varianz 1. Dabei ist $\Phi(z) = \int_{-\infty}^z \varphi(t) dt$ und 
$\varphi(t) = \frac{1}{\sqrt{2\pi}} *e^{-0,5*t^2}$
#### Beispiel 12.6.1 Berechne $\Phi(0,5)$  

```arithmico
cnormal(0,5)
0,691462
``` 
### 12.7 Gauß'sche Fehlerfunktion erf(x) 
__erf(x)__	Gaußsche Fehlerfunktion 
#### Beispiel 12.7.1 Berechne erf(0,45)
```arithmico
erf(0,45)
0,475482
``` 
### 12.8 Arithmetischer Mittelwert
__avg(x)__	Berechnet den arithmetischen Mittelwert einer Werteliste.
#### Beispiel 12.8.1 Berechne das arithmetische Mittel der Werte 1 ; 3 ; 5 ; 9 ; 12, also $\overline{x} = (1 + 3 + 5 + 9 + 12)/5 = 30/5 = 6$
```arithmico
avg(1;3;5;9;12)
6
``` 
### 12.9 Varianz einer Stichprobe
__var(x)__	Berechnet die Stichprobenvarianz $\sigma^2$ einer Werteliste.
#### Beispiel 12.9.1 Berechne die Varianz $\sigma ^2$ der Liste 1 ; 3 ; 5 ; 9 ; 12, also $\sigma ^2 = ((1-6)^2 + (3-6)^2 + (5-6)^2 + (9-6)^2 + (12-6)^2))/5 = (25 + 9 + 1 + 9 + 36)/5 = 80/5 =16$ 
```arithmico
var(1;3;5;9;12)
16
``` 
### 12.10 Standardabweichung
__sd(x)__	Berechnet die Standardabweichung $\sigma$ einer Werteliste.
#### Beispiel 12.10.1 Berechne $\sigma$ für die Liste 1 ; 3 ; 5 ; 9 ; 12
```arithmico
sd(1;3;5;9;12)
4
``` 
