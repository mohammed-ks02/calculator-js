/**
 * Application de Calculatrice - Gestion de l'interface utilisateur
 */

// Éléments du DOM
const display = document.getElementById('display');
const resultInfo = document.getElementById('result-info');
const historyList = document.getElementById('history');

// Initialisation de l'affichage
const initDisplay = () => {
    display.value = '0';
    resultInfo.textContent = '';
    resultInfo.className = 'result-info';
};

// Mettre à jour l'affichage principal
const updateDisplay = (value) => {
    display.value = value;
};

// Afficher les informations de résultat
const showResultInfo = (message, type = 'success') => {
    resultInfo.textContent = message;
    resultInfo.className = `result-info ${type}`;
    
    // Effacer le message après 3 secondes
    setTimeout(() => {
        if (resultInfo.textContent === message) {
            resultInfo.textContent = '';
            resultInfo.className = 'result-info';
        }
    }, 3000);
};

// Formater un nombre pour l'affichage
const formatNumber = (num) => {
    if (typeof num === 'string') {
        return num;
    }
    
    const strNum = String(num);
    if (strNum.length > 12) {
        return num.toExponential(6);
    }
    return strNum;
};

// Ajouter un élément à l'historique visuel
const addHistoryItem = (entry) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    
    const expression = document.createElement('div');
    expression.className = 'history-expression';
    expression.textContent = `${entry.expression} =`;
    
    const result = document.createElement('div');
    result.className = 'history-result';
    result.textContent = formatNumber(entry.result);
    
    item.appendChild(expression);
    item.appendChild(result);
    
    historyList.insertBefore(item, historyList.firstChild);
    
    // Limiter le nombre d'éléments affichés
    while (historyList.children.length > 20) {
        historyList.removeChild(historyList.lastChild);
    }
};

// Vider l'historique visuel
const clearHistoryDisplay = () => {
    historyList.innerHTML = '';
};

// Gérer les erreurs
const handleError = (errorObj) => {
    console.error('Erreur calculatrice:', errorObj);
    
    let errorMessage = 'Erreur inconnue';
    
    switch (errorObj.error) {
        case 'DIVISION_BY_ZERO':
            errorMessage = '⚠️ Division par zéro!';
            break;
        case 'INVALID_OPERATOR':
            errorMessage = '⚠️ Opérateur invalide';
            break;
        case 'INVALID_NUMBER':
            errorMessage = '⚠️ Nombre invalide';
            break;
        case 'INCOMPLETE_EXPRESSION':
            errorMessage = '⚠️ Expression incomplète';
            break;
        case 'INVALID_RESULT':
            errorMessage = '⚠️ Résultat invalide';
            break;
        default:
            errorMessage = `⚠️ ${errorObj.message}`;
    }
    
    showResultInfo(errorMessage, 'error');
    updateDisplay('Erreur');
    
    // Réinitialiser après un court délai
    setTimeout(() => {
        if (display.value === 'Erreur') {
            updateDisplay('0');
        }
    }, 1500);
};

// Gérer les clics sur les boutons
const handleButtonClick = (event) => {
    const button = event.target;
    
    if (!button.classList.contains('btn')) {
        return;
    }
    
    const action = button.dataset.action;
    const value = button.dataset.value;
    
    let result;
    
    switch (action) {
        case 'number':
            result = Calculator.inputDigit(value);
            if (result.success) {
                updateDisplay(result.display);
                showResultInfo('', 'success');
            } else {
                handleError(result);
            }
            break;
            
        case '.':
        case 'decimal':
            result = Calculator.inputDecimal();
            if (result.success) {
                updateDisplay(result.display);
            }
            break;
            
        case 'operator':
            result = Calculator.setOperator(value);
            if (result.success) {
                updateDisplay(result.display);
                if (result.operator) {
                    showResultInfo(`Opérateur: ${getOperatorSymbol(result.operator)}`, 'success');
                }
            } else {
                handleError(result);
            }
            break;
            
        case 'equals':
            result = Calculator.calculate();
            if (result.success) {
                updateDisplay(formatNumber(result.display));
                showResultInfo(`${result.message} ✓`, 'success');
                
                // Ajouter à l'historique visuel si disponible
                const history = Calculator.getHistory();
                if (history.length > 0) {
                    addHistoryItem(history[0]);
                }
            } else {
                handleError(result);
            }
            break;
            
        case 'clear':
            result = Calculator.clear();
            if (result.success) {
                updateDisplay(result.display);
                showResultInfo(result.message, 'success');
            }
            break;
            
        case 'delete':
            result = Calculator.deleteLastChar();
            if (result.success) {
                updateDisplay(result.display);
            }
            break;
            
        case 'percent':
            result = Calculator.percentage();
            if (result.success) {
                updateDisplay(result.display);
                showResultInfo('Pourcentage calculé', 'success');
            } else {
                handleError(result);
            }
            break;
            
        case 'negate':
            result = Calculator.negate();
            if (result.success) {
                updateDisplay(result.display);
                showResultInfo('Signe inversé', 'success');
            } else {
                handleError(result);
            }
            break;
            
        default:
            console.warn('Action inconnue:', action);
    }
    
    // Feedback tactile
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
};

// Obtenir le symbole de l'opérateur pour l'affichage
const getOperatorSymbol = (operator) => {
    const symbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    return symbols[operator] || operator;
};

// Support du clavier
const handleKeyboardInput = (event) => {
    const key = event.key;
    
    // Chiffres
    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        const button = document.querySelector(`[data-action="number"][data-value="${key}"]`);
        if (button) button.click();
    }
    
    // Opérateurs
    if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        const button = document.querySelector(`[data-action="operator"][data-value="${key}"]`);
        if (button) button.click();
    }
    
    // Point décimal
    if (key === '.' || key === ',') {
        event.preventDefault();
        const button = document.querySelector('[data-action="decimal"], [data-value="."]');
        if (button) button.click();
    }
    
    // Égal
    if (key === '=' || key === 'Enter') {
        event.preventDefault();
        const button = document.querySelector('[data-action="equals"]');
        if (button) button.click();
    }
    
    // Effacer tout
    if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        const button = document.querySelector('[data-action="clear"]');
        if (button) button.click();
    }
    
    // Supprimer
    if (key === 'Backspace') {
        event.preventDefault();
        const button = document.querySelector('[data-action="delete"]');
        if (button) button.click();
    }
    
    // Pourcentage
    if (key === '%') {
        event.preventDefault();
        const button = document.querySelector('[data-action="percent"]');
        if (button) button.click();
    }
};

// Initialiser l'application
const initApp = () => {
    initDisplay();
    
    // Ajouter les écouteurs d'événements
    const buttonsGrid = document.querySelector('.buttons-grid');
    buttonsGrid.addEventListener('click', handleButtonClick);
    
    // Support du clavier
    document.addEventListener('keydown', handleKeyboardInput);
    
    // Charger l'historique s'il existe
    const history = Calculator.getHistory();
    history.forEach(entry => {
        addHistoryItem(entry);
    });
    
    console.log('Calculatrice initialisée avec succès!');
    console.log('Utilisez la souris ou le clavier pour effectuer des calculs.');
};

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initApp);

// Exposer certaines fonctions pour le débogage
window.CalculatorApp = {
    getState: () => Calculator.getState(),
    getHistory: () => Calculator.getHistory(),
    clearHistory: () => {
        Calculator.clearHistory();
        clearHistoryDisplay();
    },
    compute: (a, op, b) => Calculator.compute(a, op, b)
};
