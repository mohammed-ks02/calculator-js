# Calculatrice JavaScript - Documentation Détaillée

## 📋 Table des Matières

1. [Présentation](#présentation)
2. [Architecture du Projet](#architecture-du-projet)
3. [Fonctionnalités](#fonctionnalités)
4. [Structure du Code](#structure-du-code)
5. [API de la Calculatrice](#api-de-la-calculatrice)
6. [Gestion des Erreurs](#gestion-des-erreurs)
7. [Exemples d'Utilisation](#exemples-dutilisation)

---

## 🎯 Présentation

Cette calculatrice est une application desktop développée en JavaScript pur (vanilla JS) qui offre une interface utilisateur moderne et intuitive. Elle implémente toutes les opérations arithmétiques de base avec une gestion robuste des erreurs, notamment la division par zéro.

### Technologies Utilisées

- **HTML5** - Structure de la page
- **CSS3** - Styling moderne avec gradients et animations
- **JavaScript ES6+** - Logique métier avec arrow functions et modules

---

## 🏗️ Architecture du Projet

```
calculator-app/
├── index.html          # Structure HTML de l'application
├── styles.css          # Feuilles de style CSS
├── calculator.js       # Module de calcul (logique métier)
├── app.js              # Gestion de l'interface utilisateur
├── README.md           # Ce fichier de documentation
└── TUTORIAL.md         # Guide d'utilisation pas à pas
```

### Séparation des Responsabilités

1. **calculator.js** : Contient toute la logique de calcul
   - Opérations mathématiques
   - Validation des données
   - Gestion de l'historique
   - Retourne des objets résultat structurés

2. **app.js** : Gère l'interaction avec l'utilisateur
   - Écoute des événements (clics, clavier)
   - Mise à jour de l'affichage
   - Gestion des messages d'erreur
   - Animation de l'interface

3. **index.html** : Structure de l'interface
   - Grille de boutons
   - Écran d'affichage
   - Section d'historique

4. **styles.css** : Design et mise en page
   - Thème moderne avec dégradés
   - Responsive design
   - Animations et transitions

---

## ✨ Fonctionnalités

### Opérations Mathématiques

| Opération | Symbole | Description |
|-----------|---------|-------------|
| Addition | `+` | Additionne deux nombres |
| Soustraction | `-` | Soustrait un nombre d'un autre |
| Multiplication | `×` | Multiplie deux nombres |
| Division | `÷` | Divise un nombre par un autre |
| Pourcentage | `%` | Convertit en pourcentage (divise par 100) |
| Changement de signe | `±` | Inverse le signe du nombre |

### Fonctions Spéciales

- **C (Clear)** : Réinitialise complètement la calculatrice
- **⌫ (Delete)** : Supprime le dernier caractère saisi
- **Historique** : Garde en mémoire les 50 derniers calculs
- **Support clavier** : Utilisation possible via le clavier

### Gestion des Erreurs

La calculatrice gère proprement les cas d'erreur suivants :

1. **Division par zéro** : Affiche un message d'erreur clair
2. **Opérateur invalide** : Rejette les opérateurs non supportés
3. **Nombre invalide** : Valide toutes les entrées numériques
4. **Expression incomplète** : Détecte les calculs incomplets

---

## 💻 Structure du Code

### Objet Calculatrice

Le module `Calculator` utilise un pattern IIFE (Immediately Invoked Function Expression) pour encapsuler l'état et exposer une API publique :

```javascript
const Calculator = (() => {
    // État privé
    let state = { ... };
    
    // Fonctions privées (arrow functions)
    const validateNumber = (value) => { ... };
    const performOperation = (operator, a, b) => { ... };
    
    // API publique
    return {
        inputDigit: (digit) => { ... },
        calculate: () => { ... },
        // ... autres méthodes
    };
})();
```

### Format des Objets Résultat

Toutes les méthodes retournent des objets structurés :

#### Succès
```javascript
{
    success: true,
    error: null,
    message: "Calcul réussi",
    result: 42,
    display: "42",
    operandA: 6,
    operandB: 7,
    operator: "*"
}
```

#### Erreur
```javascript
{
    success: false,
    error: "DIVISION_BY_ZERO",
    message: "Erreur: Division par zéro impossible",
    result: null
}
```

### Utilisation du Switch

Les opérations utilisent une structure `switch` pour une meilleure lisibilité :

```javascript
switch (operator) {
    case '+':
        result = numA + numB;
        break;
    case '-':
        result = numA - numB;
        break;
    case '*':
        result = numA * numB;
        break;
    case '/':
        // Vérification division par zéro
        if (numB === 0) {
            return { success: false, error: 'DIVISION_BY_ZERO', ... };
        }
        result = numA / numB;
        break;
    default:
        return { success: false, error: 'INVALID_OPERATOR', ... };
}
```

---

## 🔌 API de la Calculatrice

### Méthodes Publiques

#### `inputDigit(digit)`
Ajoute un chiffre à l'affichage.
- **Paramètre** : `digit` (string) - Chiffre de 0 à 9
- **Retour** : Objet résultat avec `display`

#### `inputDecimal()`
Ajoute un point décimal.
- **Retour** : Objet résultat avec `display`

#### `setOperator(operator)`
Définit l'opérateur pour le calcul.
- **Paramètre** : `operator` (string) - '+', '-', '*', '/'
- **Retour** : Objet résultat avec `operator` et `previousValue`

#### `calculate()`
Effectue le calcul et retourne le résultat.
- **Retour** : Objet résultat complet avec `result`

#### `clear()`
Réinitialise la calculatrice.
- **Retour** : Objet résultat avec message de confirmation

#### `deleteLastChar()`
Supprime le dernier caractère saisi.
- **Retour** : Objet résultat avec `display` mis à jour

#### `percentage()`
Convertit le nombre actuel en pourcentage.
- **Retour** : Objet résultat avec `display`

#### `negate()`
Inverse le signe du nombre actuel.
- **Retour** : Objet résultat avec `display`

#### `getHistory()`
Retourne l'historique des calculs.
- **Retour** : Tableau d'objets historique

#### `clearHistory()`
Efface l'historique des calculs.
- **Retour** : Objet résultat avec message

#### `getState()`
Retourne l'état actuel de la calculatrice.
- **Retour** : Objet avec `currentValue`, `previousValue`, `operator`, etc.

#### `compute(a, operator, b)`
Méthode utilitaire pour effectuer un calcul direct.
- **Paramètres** :
  - `a` (number|string) : Premier opérande
  - `operator` (string) : Opérateur ('+', '-', '*', '/')
  - `b` (number|string) : Deuxième opérande
- **Retour** : Objet résultat complet

---

## ⚠️ Gestion des Erreurs

### Types d'Erreurs

| Code d'Erreur | Description | Message Utilisateur |
|---------------|-------------|---------------------|
| `DIVISION_BY_ZERO` | Tentative de division par 0 | "⚠️ Division par zéro!" |
| `INVALID_OPERATOR` | Opérateur non supporté | "⚠️ Opérateur invalide" |
| `INVALID_NUMBER` | Nombre mal formé | "⚠️ Nombre invalide" |
| `INCOMPLETE_EXPRESSION` | Calcul incomplet | "⚠️ Expression incomplète" |
| `INVALID_RESULT` | Résultat non défini (Infini, NaN) | "⚠️ Résultat invalide" |
| `INVALID_DIGIT` | Chiffre invalide | "Chiffre invalide" |

### Validation des Entrées

```javascript
// Validation des nombres
const validateNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
};

// Validation des opérateurs
const validateOperator = (op) => {
    const validOperators = ['+', '-', '*', '/'];
    return validOperators.includes(op);
};
```

---

## 📝 Exemples d'Utilisation

### Via l'Interface Graphique

1. **Addition simple** : `5 + 3 =` → Affiche `8`
2. **Multiplication** : `7 × 6 =` → Affiche `42`
3. **Division** : `20 ÷ 4 =` → Affiche `5`
4. **Division par zéro** : `5 ÷ 0 =` → Affiche "⚠️ Division par zéro!"

### Via la Console JavaScript

Ouvrez la console du navigateur (F12) et utilisez :

```javascript
// Calcul direct
CalculatorApp.compute(10, '+', 5);
// Retourne: { success: true, result: 15, ... }

// Voir l'état actuel
CalculatorApp.getState();

// Voir l'historique
CalculatorApp.getHistory();

// Effacer l'historique
CalculatorApp.clearHistory();

// Test de division par zéro
CalculatorApp.compute(5, '/', 0);
// Retourne: { success: false, error: 'DIVISION_BY_ZERO', ... }
```

### Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `0-9` | Saisir un chiffre |
| `+ - * /` | Opérateur |
| `.` ou `,` | Point décimal |
| `Entrée` ou `=` | Calculer (=) |
| `Échap` ou `C` | Effacer tout |
| `Backspace` | Supprimer dernier caractère |
| `%` | Pourcentage |

---

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `styles.css`, modifiez les variables de couleur :

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-operator {
    background: #3498db; /* Bleu */
}

.btn-equals {
    background: #e74c3c; /* Rouge */
}
```

### Changer la Taille

Ajustez dans `styles.css` :

```css
.calculator-container {
    max-width: 400px; /* Largeur maximale */
}

.display {
    font-size: 2.5rem; /* Taille de l'affichage */
}
```

---

## 📊 Performances

- **Temps de réponse** : < 1ms pour toutes les opérations
- **Historique** : Limité à 50 entrées pour éviter la surcharge mémoire
- **Affichage** : Maximum 12 chiffres avant notation scientifique
- **Précision** : Arrondi à 9 décimales pour éviter les erreurs flottantes

---

## 🔒 Sécurité

- Toutes les entrées sont validées avant traitement
- Protection contre les injections via validation stricte
- Pas d'utilisation de `eval()` - toutes les opérations sont typées
- Encapsulation complète de l'état via IIFE

---

## 📞 Support

Pour toute question ou problème, consultez le fichier `TUTORIAL.md` pour un guide pas à pas.
