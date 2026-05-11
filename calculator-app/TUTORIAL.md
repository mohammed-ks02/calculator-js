# 🧮 Tutoriel : Comment Utiliser la Calculatrice JavaScript

## 📖 Table des Matières

1. [Installation et Lancement](#installation-et-lancement)
2. [Premiers Pas](#premiers-pas)
3. [Guide des Fonctionnalités](#guide-des-fonctionnalités)
4. [Exercices Pratiques](#exercices-pratiques)
5. [Dépannage](#dépannage)

---

## 🚀 Installation et Lancement

### Méthode 1 : Ouvrir Directement dans le Navigateur (Recommandé)

1. **Localisez le dossier** `calculator-app`
2. **Double-cliquez** sur le fichier `index.html`
3. L'application s'ouvre dans votre navigateur par défaut

### Méthode 2 : Utiliser un Serveur Local

Si vous préférez utiliser un serveur local :

```bash
# Avec Python 3
cd calculator-app
python3 -m http.server 8000

# Avec Node.js (npx)
cd calculator-app
npx serve

# Avec PHP
cd calculator-app
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

### Méthode 3 : Utiliser Live Server (VS Code)

1. Installez l'extension **Live Server** dans VS Code
2. Ouvrez le dossier `calculator-app` dans VS Code
3. Faites un clic droit sur `index.html`
4. Cliquez sur **"Open with Live Server"**

---

## 🎯 Premiers Pas

### Interface de la Calculatrice

Quand vous ouvrez l'application, vous voyez :

```
┌─────────────────────────┐
│   Calculatrice JS       │
├─────────────────────────┤
│                   0     │ ← Écran d'affichage
├───┬───┬───┬───┤
│ C │ ⌫ │ % │ ÷ │ ← Opérateurs
├───┼───┼───┼───┤
│ 7 │ 8 │ 9 │ × │
├───┼───┼───┼───┤
│ 4 │ 5 │ 6 │ − │
├───┼───┼───┼───┤
│ 1 │ 2 │ 3 │ + │
├───┼───┼───┼───┤
│ 0 │ . │ ± │ = │
└───┴───┴───┴───┘
┌─────────────────────────┐
│ Historique des calculs  │
│ (vide au démarrage)     │
└─────────────────────────┘
```

### Votre Premier Calcul

**Exemple : 5 + 3**

1. Cliquez sur `5` → L'écran affiche `5`
2. Cliquez sur `+` → L'écran garde `5`, un indicateur montre l'opérateur
3. Cliquez sur `3` → L'écran affiche `3`
4. Cliquez sur `=` → L'écran affiche `8` ✅

**Résultat visible :**
- Affichage principal : `8`
- Message vert : "Calcul réussi ✓"
- Historique : `5 + 3 = 8`

---

## 📚 Guide des Fonctionnalités

### 1. Opérations de Base

#### Addition (+)
```
Étapes : 1 → 2 → + → 8 → =
Résultat : 20
```

#### Soustraction (-)
```
Étapes : 5 → 0 → - → 2 → 5 → =
Résultat : 25
```

#### Multiplication (×)
```
Étapes : 7 → × → 6 → =
Résultat : 42
```

#### Division (÷)
```
Étapes : 1 → 0 → 0 → ÷ → 4 → =
Résultat : 25
```

### 2. Fonctions Spéciales

#### Bouton C (Clear) - Tout effacer
- **Utilisation** : Cliquez sur `C` à tout moment
- **Effet** : Réinitialise complètement la calculatrice
- **Message** : "Calculatrice réinitialisée"

```
Avant : 12345 affiché
Après clic sur C : 0 affiché
```

#### Bouton ⌫ (Delete) - Effacer le dernier caractère
- **Utilisation** : Cliquez pour supprimer le dernier chiffre
- **Utile** : Corriger une erreur de saisie

```
Étapes : 1 → 2 → 3 → 4 → 5
Clic sur ⌫ : Affiche 1234
Autre clic ⌫ : Affiche 123
```

#### Bouton % (Pourcentage)
- **Utilisation** : Convertit le nombre en pourcentage
- **Formule** : valeur ÷ 100

```
Étapes : 5 → 0 → %
Résultat : 0.5
(50% = 50/100 = 0.5)
```

#### Bouton ± (Changer le signe)
- **Utilisation** : Inverse le signe du nombre
- **Effet** : Positif ↔ Négatif

```
Étapes : 5 → ±
Résultat : -5

Encore ± : 5
```

### 3. Nombres Décimaux

#### Utiliser le point décimal
```
Étapes : 3 → . → 1 → 4 → =
Affichage : 3.14
```

**Règles :**
- Un seul point décimal par nombre
- Le point s'ajoute automatiquement après un opérateur

### 4. Calculs en Chaîne

La calculatrice gère les calculs successifs :

```
Étapes : 
1. 5 + 3 =      → Affiche 8
2. × 2 =        → Affiche 16 (8 × 2)
3. - 4 =        → Affiche 12 (16 - 4)
4. ÷ 3 =        → Affiche 4 (12 ÷ 3)
```

### 5. Historique des Calculs

**Consulter l'historique :**
- Regardez la section "Historique des calculs" en bas
- Les 20 derniers calculs sont affichés
- Format : `expression = résultat`

**Exemple d'historique :**
```
┌─────────────────────────┐
│ Historique des calculs  │
├─────────────────────────┤
│ 12 ÷ 3 =                │
│ 4                       │
├─────────────────────────┤
│ 5 + 3 =                 │
│ 8                       │
└─────────────────────────┘
```

---

## ⌨️ Utilisation avec le Clavier

### Raccourcis Disponibles

| Touche | Action | Équivalent Souris |
|--------|--------|-------------------|
| `0` - `9` | Chiffres | Boutons 0-9 |
| `+` | Addition | Bouton + |
| `-` | Soustraction | Bouton − |
| `*` | Multiplication | Bouton × |
| `/` | Division | Bouton ÷ |
| `.` ou `,` | Point décimal | Bouton . |
| `Entrée` ou `=` | Calculer | Bouton = |
| `Échap` | Tout effacer | Bouton C |
| `Backspace` | Supprimer | Bouton ⌫ |
| `%` | Pourcentage | Bouton % |

### Exemple avec le Clavier

Pour faire `25 + 17 =` :
```
Tapez : 2 → 5 → + → 1 → 7 → Entrée
Résultat : 42
```

---

## 🎓 Exercices Pratiques

### Exercice 1 : Calcul Simple
**Objectif** : Calculer 15 + 27

```
Solution :
1. Cliquez sur 1 → 5
2. Cliquez sur +
3. Cliquez sur 2 → 7
4. Cliquez sur =
✅ Résultat attendu : 42
```

### Exercice 2 : Multiplication
**Objectif** : Calculer 12 × 8

```
Solution :
1. Cliquez sur 1 → 2
2. Cliquez sur ×
3. Cliquez sur 8
4. Cliquez sur =
✅ Résultat attendu : 96
```

### Exercice 3 : Division avec Décimales
**Objectif** : Calculer 10 ÷ 3

```
Solution :
1. Cliquez sur 1 → 0
2. Cliquez sur ÷
3. Cliquez sur 3
4. Cliquez sur =
✅ Résultat attendu : 3.333333333
```

### Exercice 4 : Test de Division par Zéro
**Objectif** : Voir la gestion d'erreur

```
Solution :
1. Cliquez sur 5
2. Cliquez sur ÷
3. Cliquez sur 0
4. Cliquez sur =
⚠️ Message d'erreur : "Division par zéro!"
L'écran affiche temporairement "Erreur"
```

### Exercice 5 : Calcul en Chaîne
**Objectif** : Enchaîner plusieurs opérations

```
Solution :
1. 100 + 50 =      → 150
2. - 25 =          → 125
3. × 2 =           → 250
4. ÷ 5 =           → 50
✅ Résultat final : 50
```

### Exercice 6 : Pourcentages
**Objectif** : Calculer 25% de 80

```
Solution :
Méthode 1 :
1. 25 → % → 0.25
2. × 80 → =
✅ Résultat : 20

Méthode 2 :
1. 80 × 25 → =
2. → % → 20
✅ Résultat : 20
```

### Exercice 7 : Nombres Négatifs
**Objectif** : Utiliser le changement de signe

```
Solution :
1. 5 → ± → -5
2. × 3 → =
✅ Résultat : -15
```

---

## 🔧 Dépannage

### Problème : La calculatrice ne s'affiche pas

**Solutions :**
1. Vérifiez que tous les fichiers sont dans le même dossier
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Assurez-vous que JavaScript est activé dans votre navigateur

### Problème : Les boutons ne répondent pas

**Solutions :**
1. Actualisez la page (F5 ou Ctrl+R)
2. Vérifiez qu'aucune extension ne bloque JavaScript
3. Essayez un autre navigateur

### Problème : L'affichage montre "Erreur"

**Causes possibles :**
- Division par zéro
- Nombre trop grand (dépassement)
- Expression incomplète

**Solution :** Cliquez sur `C` pour réinitialiser

### Problème : L'historique ne s'affiche pas

**Solutions :**
1. Effectuez d'abord un calcul complet (avec =)
2. Vérifiez que la section historique n'est pas masquée
3. Actualisez la page

---

## 💡 Astuces et Bonnes Pratiques

### 1. Utiliser le Clavier pour Plus de Rapidité
```
Au lieu de cliquer, tapez directement :
123 + 456 Entrée
```

### 2. Corriger Rapidement une Erreur
```
Si vous tapez 1234 au lieu de 123 :
→ Cliquez sur ⌫ une fois
OU
→ Tapez Backspace
```

### 3. Vérifier l'Historique
```
Après plusieurs calculs, consultez l'historique
pour retrouver vos résultats précédents
```

### 4. Tests Rapides depuis la Console
```javascript
// Ouvrez F12 > Console
CalculatorApp.compute(10, '+', 20);  // 30
CalculatorApp.getState();            // Voir l'état
CalculatorApp.getHistory();          // Voir l'historique
```

### 5. Mode Plein Écran
```
Appuyez sur F11 pour un meilleur confort visuel
```

---

## 🎨 Personnalisation Avancée

### Changer le Thème de Couleurs

Ouvrez `styles.css` et modifiez :

```css
/* Fond de page */
body {
    background: linear-gradient(135deg, #votre-couleur1, #votre-couleur2);
}

/* Boutons opérateurs */
.btn-operator {
    background: #votre-couleur;
}

/* Bouton égal */
.btn-equals {
    background: #votre-couleur;
}
```

### Ajuster la Taille

Dans `styles.css` :

```css
/* Pour une calculatrice plus grande */
.calculator-container {
    max-width: 500px;  /* au lieu de 400px */
}

.display {
    font-size: 3rem;  /* au lieu de 2.5rem */
}
```

---

## 📞 Besoin d'Aide ?

1. **Consultez le README.md** pour la documentation technique
2. **Ouvrez la console** (F12) pour voir les messages de débogage
3. **Vérifiez les fichiers** :
   - `index.html` - Structure
   - `styles.css` - Style
   - `calculator.js` - Logique
   - `app.js` - Interface

---

## 🎉 Félicitations !

Vous maîtrisez maintenant la calculatrice JavaScript ! 

N'hésitez pas à :
- Expérimenter avec différentes opérations
- Tester les limites (grands nombres, décimales)
- Consulter l'historique de vos calculs
- Personnaliser l'apparence selon vos goûts

**Bon calcul ! 🧮✨**
