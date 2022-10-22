__[a1; a2; ...]__ Vektoren werden als Liste von Koordinaten in eckigen Klammern geschrieben. 
### 10.1 Vektoraddition
__[a1; a2; a3] + [b1; b2; b3]__  
Berechnet die Vektorsumme von $\vec{a} =\left(\begin{array}{c} a_1 \\ a_2 \\ a_3 \end{array}\right)$ und 
$\vec{b} =\left(\begin{array}{c} b_1 \\ b_2 \\ b_3 \end{array}\right)$.
### Beispiel 10.1.1	Berechne die Summe der Vektoren 
$\left(\begin{array}{c} 1 \\ -2 \\ 2 \end{array}\right) +\left(\begin{array}{c} 2 \\ 1 \\ 0 \end{array}\right)$
```arithmico
[1; -2; 2] + [2; 1; 0]
[3; -1; 2]
``` 
### 10.2 Skalarprodukt
__[a1; a2; a3] * [b1; b2; b3]__  
Berechnet das Skalarprodukt von $\vec{a} =\left(\begin{array}{c} a_1 \\ a_2 \\ a_3 \end{array}\right)$ und 
$\vec{b} =\left(\begin{array}{c} b_1 \\ b_2 \\ b_3 \end{array}\right)$.
#### Beispiel 10.2.1 Berechne das Skalarprodukt der Vektoren 
$\left(\begin{array}{c} 1 \\ -2 \\ 2 \end{array}\right) *\left(\begin{array}{c} 2 \\ 1 \\ 0 \end{array}\right)$
```arithmico
[1; -2; 2] * [2; 1; 0]
0
``` 

### 10.3 Vektorprodukt
__cross([a1; a2; a3] ; [b1; b2; b3])__  
Berechnet das Vektorprodukt von $\vec{a} =\left(\begin{array}{c} a_1 \\ a_2 \\ a_3 \end{array}\right)$ und 
$\vec{b} =\left(\begin{array}{c} b_1 \\ b_2 \\ b_3 \end{array}\right)$.
#### Beispiel 10.3.1 Berechne das Vektorprodukt der Vektoren 
$\left(\begin{array}{c} 1 \\ -2 \\ 2 \end{array}\right) \times \left(\begin{array}{c} 2 \\ 1 \\ 0 \end{array}\right)$
```arithmico
cross([1; -2; 2] * [2; 1; 0])
[-2; 4; 5]
``` 

### 10.4 Vektorlänge
__abs([a1;a2;a3])__	 Länge (Betrag) des Vektors $\left(\begin{array}{c} a_1 \\ a_2 \\ a_3 \end{array}\right)$.
#### Beispiel 10.4.1 Berechne die Länge (den Betrag) des Vektors  
$\left(\begin{array}{c} 1 \\ -2 \\ 2 \end{array}\right)$ 

```arithmico
length([1; -2; 2])
3
``` 
## 11 Matrizen 
__[[a1;b1;...] ; [a2;b2;...] ; ...]__ Matrizen werden als Liste von (Zeilen-) Vektoren in eckigen Klammern geschrieben.
### 11.1 Matrizensumme
__A + B__ Berechnet die Matrizensumme der Matrizen A und B
#### Beispiel 11.1.1 Berechne die Matrizensumme 
$\left(\begin{array}{cc}1&2\\3&4\end{array}\right) + \left(\begin{array}{cc}5&6\\7&8\end{array}\right)$ 

```arithmico
[[1; 2]; [3; 4]]+[[5; 6]; [7; 8]]
[[6; 8]; [10; 12]]
``` 
### 11.2 Matrizenprodukt
__A * B__ Berechnet das Matrizenprodukt der Matrizen A und B
#### Beispiel 11.2.1 Berechne das Matrizenprodukt
$\left(\begin{array}{cc}1&2\\3&4\end{array}\right) * \left(\begin{array}{cc}5&6\\7&8\end{array}\right)$ 

```arithmico
[[1; 2]; [3; 4]]*[[5; 6]; [7; 8]]
[[19; 22]; [43; 50]]
``` 
#### Beispiel 11.2.2 Berechne das Matrizenprodukt 
$\left(\begin{array}{cc}1&2\\3&4\end{array}\right) * \left(\begin{array}{cc}-2&1\\1,5&-0,5\end{array}\right)$  

```arithmico
[[1; 2]; [3; 4]]*[[-2; 1]; 1,5; -0,5]]
[[1; 0]; [0; 1]]
``` 

### 11.3 Inverse Matrix
__matrix:inverse(A)__ Berechnet die inverse Matrix $A^{-1}$ zu einer (quadratischen) Matrix A.
#### Beispiel 11.3.1 Berechne die inverse Matrix zu  
$\left(\begin{array}{cc}1&2\\3&4\end{array}\right)$

```arithmico
matrix:inverse([[1; 2]; [3; 4]])
[[-2; 1]; [3 / 2; -1 / 2]]
``` 


