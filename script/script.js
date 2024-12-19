document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality
    const toggleBtn = document.getElementById('toggleBtn');
    const prefixSection = document.getElementById('prefixSection');
    const postfixSection = document.getElementById('postfixSection');

    toggleBtn.addEventListener('click', () => {
        prefixSection.classList.toggle('hidden');
        postfixSection.classList.toggle('hidden');
        toggleBtn.textContent = prefixSection.classList.contains('hidden') 
            ? 'Switch to Prefix' 
            : 'Switch to Postfix';
    });

    // Calculator functionality
    const prefixInput = document.getElementById('prefixInput');
    const calcBtns = document.querySelectorAll('#prefixSection .calc-btn');
    const clearBtn = document.querySelector('#prefixSection .clear-btn');
    const calculateBtn = document.querySelector('#prefixSection .calculate-btn');
    const prefixResult = document.getElementById('prefixResult');

    calcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('backspace')) {
                prefixInput.value = prefixInput.value.slice(0, -1);
            } else if (btn.textContent === 'Space') {
                prefixInput.value += ' ';
            } else {
                prefixInput.value += btn.textContent;
            }
        });
    });

    // Add calculate button functionality
    if (calculateBtn && prefixResult) {
        calculateBtn.addEventListener('click', () => {
            try {
                // Get input value and evaluate
                const expression = prefixInput.value.trim();
                if (!expression) {
                    prefixResult.value = 'Error: Empty expression';
                    return;
                }
                
                const result = evaluatePrefix(expression);
                prefixResult.value = result;
                
                // Debug
                console.log('Input:', expression);
                console.log('Result:', result);
            } catch (error) {
                prefixResult.value = 'Error: ' + error.message;
                console.error(error);
            }
        });
    } else {
        console.error('Calculate button or result field missing');
    }

    // Postfix Calculator functionality
    const postfixInput = document.getElementById('postfixInput');
    const postCalcBtns = document.querySelectorAll('#postfixSection .calc-btn');
    const postClearBtn = document.querySelector('#postfixSection .clear-btn');
    const postCalculateBtn = document.querySelector('#postfixSection .calculate-btn');
    const postfixResult = document.getElementById('postfixResult');

    postCalcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('backspace')) {
                postfixInput.value = postfixInput.value.slice(0, -1);
            } else if (btn.textContent === 'Space') {
                postfixInput.value += ' ';
            } else {
                postfixInput.value += btn.textContent;
            }
        });
    });

    // Add postfix calculate button functionality
if (postCalculateBtn && postfixResult) {
    postCalculateBtn.addEventListener('click', () => {
        try {
            const expression = postfixInput.value.trim();
            if (!expression) {
                postfixResult.value = 'Error: Empty expression';
                return;
            }
            
            const result = evaluatePostfix(expression);
            postfixResult.value = result;
            
            console.log('Postfix Input:', expression);
            console.log('Postfix Result:', result);
        } catch (error) {
            postfixResult.value = 'Error: ' + error.message;
            console.error(error);
        }
    });
}

    // Clear button
    clearBtn.addEventListener('click', () => {
        prefixInput.value = '';
    });

    postClearBtn.addEventListener('click', () => {
        postfixInput.value = '';
    });
});

function evaluatePrefix(expr) {
    // Remove extra spaces and split into tokens
    const tokens = expr.trim().split(/\s+/);
    const stack = [];

    // Process tokens from right to left
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];

        // If token is a number
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        }
        // If token is an operator
        else {
            if (stack.length < 2) {
                throw new Error('Invalid prefix expression');
            }

            const a = stack.pop();
            const b = stack.pop();

            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    if (b === 0) throw new Error('Division by zero');
                    stack.push(a / b);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid prefix expression');
    }

    return stack[0];
}

function evaluatePostfix(expr) {
    const tokens = expr.trim().split(/\s+/);
    const stack = [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            if (stack.length < 2) {
                throw new Error('Invalid postfix expression');
            }
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/':
                    if (b === 0) throw new Error('Division by zero');
                    stack.push(a / b);
                    break;
                default: throw new Error('Invalid operator');
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid postfix expression');
    }
    return stack[0];
}