/**
 * Calculatrice JavaScript - Module de calcul
 * Utilise des arrow functions et retourne des objets résultat
 */

const Calculator = (() => {
    // État interne de la calculatrice
    let state = {
        currentValue: '0',
        previousValue: null,
        operator: null,
        waitingForOperand: false,
        history: []
    };

    // Validation des entrées
    const validateNumber = (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num);
    };

    const validateOperator = (op) => {
        const validOperators = ['+', '-', '*', '/'];
        return validOperators.includes(op);
    };

    // Opérations mathématiques avec switch
    const performOperation = (operator, a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        // Vérification de division par zéro
        if (operator === '/' && numB === 0) {
            return {
                success: false,
                error: 'DIVISION_BY_ZERO',
                message: 'Erreur: Division par zéro impossible',
                result: null
            };
        }

        let result;
        
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
                result = numA / numB;
                break;
            default:
                return {
                    success: false,
                    error: 'INVALID_OPERATOR',
                    message: `Opérateur invalide: ${operator}`,
                    result: null
                };
        }

        // Vérifier si le résultat est valide
        if (!isFinite(result)) {
            return {
                success: false,
                error: 'INVALID_RESULT',
                message: 'Résultat non défini',
                result: null
            };
        }

        return {
            success: true,
            error: null,
            message: 'Calcul réussi',
            result: Math.round(result * 1000000000) / 1000000000, // Éviter les erreurs de flottant
            operandA: numA,
            operandB: numB,
            operator: operator
        };
    };

    // Ajouter un nombre à l'affichage
    const inputDigit = (digit) => {
        const { currentValue, waitingForOperand } = state;

        if (waitingForOperand) {
            state.currentValue = digit;
            state.waitingForOperand = false;
        } else {
            state.currentValue = currentValue === '0' ? digit : currentValue + digit;
        }

        return {
            success: true,
            display: state.currentValue
        };
    };

    // Ajouter un point décimal
    const inputDecimal = () => {
        const { currentValue, waitingForOperand } = state;

        if (waitingForOperand) {
            state.currentValue = '0.';
            state.waitingForOperand = false;
            return {
                success: true,
                display: state.currentValue
            };
        }

        if (!currentValue.includes('.')) {
            state.currentValue = currentValue + '.';
        }

        return {
            success: true,
            display: state.currentValue
        };
    };

    // Définir l'opérateur
    const setOperator = (nextOperator) => {
        const { currentValue, previousValue, operator } = state;

        if (!validateOperator(nextOperator)) {
            return {
                success: false,
                error: 'INVALID_OPERATOR',
                message: 'Opérateur invalide',
                display: state.currentValue
            };
        }

        // Si on a déjà un opérateur et qu'on attend un opérande, changer l'opérateur
        if (operator && waitingForOperand) {
            state.operator = nextOperator;
            return {
                success: true,
                display: state.currentValue,
                operator: nextOperator
            };
        }

        // Si on a une valeur précédente, effectuer le calcul d'abord
        if (previousValue && operator) {
            const operationResult = performOperation(operator, previousValue, currentValue);
            
            if (!operationResult.success) {
                return operationResult;
            }

            state.previousValue = String(operationResult.result);
            state.currentValue = String(operationResult.result);
            
            // Ajouter à l'historique
            addToHistory(operationResult);
        } else {
            state.previousValue = currentValue;
        }

        state.operator = nextOperator;
        state.waitingForOperand = true;

        return {
            success: true,
            display: state.currentValue,
            operator: nextOperator,
            previousValue: state.previousValue
        };
    };

    // Calculer le résultat final
    const calculate = () => {
        const { currentValue, previousValue, operator } = state;

        if (!operator || !previousValue) {
            return {
                success: false,
                error: 'INCOMPLETE_EXPRESSION',
                message: 'Expression incomplète',
                display: state.currentValue
            };
        }

        const operationResult = performOperation(operator, previousValue, currentValue);

        if (!operationResult.success) {
            // En cas d'erreur, réinitialiser l'état
            state.currentValue = '0';
            state.previousValue = null;
            state.operator = null;
            state.waitingForOperand = false;
            return operationResult;
        }

        // Ajouter à l'historique
        addToHistory(operationResult);

        state.currentValue = String(operationResult.result);
        state.previousValue = null;
        state.operator = null;
        state.waitingForOperand = true;

        return {
            success: true,
            ...operationResult,
            display: state.currentValue
        };
    };

    // Réinitialiser la calculatrice
    const clear = () => {
        state = {
            currentValue: '0',
            previousValue: null,
            operator: null,
            waitingForOperand: false,
            history: state.history
        };

        return {
            success: true,
            display: '0',
            message: 'Calculatrice réinitialisée'
        };
    };

    // Supprimer le dernier caractère
    const deleteLastChar = () => {
        const { currentValue, waitingForOperand } = state;

        if (waitingForOperand) {
            return {
                success: true,
                display: state.currentValue
            };
        }

        if (currentValue.length === 1) {
            state.currentValue = '0';
        } else {
            state.currentValue = currentValue.slice(0, -1);
        }

        return {
            success: true,
            display: state.currentValue
        };
    };

    // Pourcentage
    const percentage = () => {
        const { currentValue } = state;
        const num = parseFloat(currentValue);

        if (!validateNumber(currentValue)) {
            return {
                success: false,
                error: 'INVALID_NUMBER',
                message: 'Nombre invalide',
                display: state.currentValue
            };
        }

        state.currentValue = String(num / 100);

        return {
            success: true,
            display: state.currentValue
        };
    };

    // Changer le signe
    const negate = () => {
        const { currentValue } = state;
        const num = parseFloat(currentValue);

        if (!validateNumber(currentValue)) {
            return {
                success: false,
                error: 'INVALID_NUMBER',
                message: 'Nombre invalide',
                display: state.currentValue
            };
        }

        state.currentValue = String(-num);

        return {
            success: true,
            display: state.currentValue
        };
    };

    // Ajouter à l'historique
    const addToHistory = (operationResult) => {
        const historyEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            expression: `${operationResult.operandA} ${operationResult.operator} ${operationResult.operandB}`,
            result: operationResult.result,
            fullResult: operationResult
        };

        state.history.unshift(historyEntry);
        
        // Garder seulement les 50 derniers calculs
        if (state.history.length > 50) {
            state.history = state.history.slice(0, 50);
        }

        return historyEntry;
    };

    // Obtenir l'historique
    const getHistory = () => {
        return state.history;
    };

    // Effacer l'historique
    const clearHistory = () => {
        state.history = [];
        return {
            success: true,
            message: 'Historique effacé'
        };
    };

    // Obtenir l'état actuel
    const getState = () => {
        return {
            currentValue: state.currentValue,
            previousValue: state.previousValue,
            operator: state.operator,
            waitingForOperand: state.waitingForOperand,
            historyLength: state.history.length
        };
    };

    // API publique de la calculatrice
    return {
        inputDigit: (digit) => {
            if (!/^[0-9]$/.test(digit)) {
                return {
                    success: false,
                    error: 'INVALID_DIGIT',
                    message: 'Chiffre invalide'
                };
            }
            return inputDigit(digit);
        },
        
        inputDecimal,
        setOperator,
        calculate,
        clear,
        deleteLastChar,
        percentage,
        negate,
        getHistory,
        clearHistory,
        getState,
        
        // Méthode utilitaire pour exécuter un calcul complet
        compute: (a, operator, b) => {
            if (!validateNumber(a) || !validateNumber(b)) {
                return {
                    success: false,
                    error: 'INVALID_NUMBERS',
                    message: 'Nombres invalides',
                    result: null
                };
            }
            
            if (!validateOperator(operator)) {
                return {
                    success: false,
                    error: 'INVALID_OPERATOR',
                    message: 'Opérateur invalide',
                    result: null
                };
            }
            
            return performOperation(operator, a, b);
        }
    };
})();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
