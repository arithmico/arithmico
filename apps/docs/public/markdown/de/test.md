## 2. Einfache Rechnungen und Standardfunktionen
### 2.1 KlaPoPuStri-Regel
#### Beispiel 2.1.1 
Der MathExplorer beachtet die Vorfahrtsregel "Klammer vor Potenz vor Punkt vor Strich" (KlaPoPuStri-Regel), Operatoren der gleichen Hierarchiestufe werden von links nach rechts bearbeitet. Als mathematische Klammern werden ausschließlich runde Klammern ( ) akzeptiert.  

```arithmico
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

