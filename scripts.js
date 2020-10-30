const calcKeys = document.querySelectorAll('.key');
const display = document.querySelector('.display');

//array that holds display expression
let operation = [];
let number = [];


//evaluate expression

//keeps expression from getting hazardous

function errorPresent(a) {
    return (a === 'undefined' || a === 'overflow') ? true : false;
}

function isOperator(a) {
    return (a == '+' || a == '÷' || a == '×' || a == '-' || a == '*' || a == '/') ? true : false;
}

function setOperator(a) {
    if (a === '+') return add;
    else if (a === "-") return subtract;
    else if (a === '÷' || a === '/') return divide;
    else if (a === '×' || a === '*') return multiply;
    else return;
}

calcKeys.forEach((key) => {
    key.addEventListener('click', getInput)
});

function getInput(e) {
   
    if (!e.target.id) {
         //for that one blank key lel
        return;
    }
    else if (e.target.id === 'clear') {
        //resets display expression
        operation = [];
        number = [];
        display.innerHTML = operation.join('');
        return;
    }

    else if (e.target.id === 'back') number.pop(); //for single character deletion in display

    else if (isOperator(e.target.id)) {
        if (number.length === 0 && operation.length === 0 || errorPresent(operation[0])) return;
        //puts display number in operation and selected operator, resets display
        else if (operation.length === 0) {
            operation[0] = parseFloat(number.join(''));
            operation[1] = setOperator(e.target.id);
            number = [];
        }
        //for when you select operator after result from equals sign
        else if (operation.length === 1 && number.length === 0) {
            operation[1] = setOperator(e.target.id);
        }
        //for when you select operator after an equal sign and number
        else if (operation.length === 1 && number.length !==0) {
            
            operation[0] = parseFloat(number.join(''));
            operation[1] = setOperator(e.target.id);
            number = []
        }
        //changes operator if one is already selected
        else if (operation.length === 2 && number.length === 0) operation[1] = setOperator(e.target.id);

        //finally performs calculation in normal scenarios and resets appropriately
        else {
            operation[2] = parseFloat(number.join(''));
            operation[0] = operate(...operation);
            operation[1] = setOperator(e.target.id);
            operation.pop();
            number = [];
        }
        }
        //decides whether to add a negative or positive sign to nubmber
    else if (e.target.id === 'negative') (number[0] === '-') ? number.shift() : number.unshift('-');

    else if (e.target.id === '=') {
        if (operation.length === 0 || errorPresent(operation[0])) return;
        //resets everything if you hit equals with no input
        else if (number.length === 0) operation = [];
        //performs calculation and resets appropriately
        else {
            operation[2] = parseFloat(number.join(''));
            operation[0] = operate(...operation);
            operation.splice(-2);
            number = [];
        }
    }
    //adds decimal if one isn't already there
    else if (e.target.id === '.' && number.indexOf('.') === -1) number.push(e.target.id);

    //behavior for numbers - adds them to number array and also resets operation if error
    else if (number.length < 12 && e.target.id !== '.') {
        if (errorPresent(operation[0])) operation = [];
        number.push(e.target.id);
    }

    //display current
    if (number.length > 0) {
        display.innerHTML = number.join('');
    }

    //watches for overflow on decimal numbers, truncates number after 12 digits
    else if (operation[0] && operation[0].toString().indexOf('.') !== -1) {
        if (operation[0].toString().substring(0, operation[0].toString().indexOf('.')).length > 12) {
            operation[0] = 'overflow';
            display.innerHTML = operation[0];
        }
        else if (operation[0].toString().length > 12) display.innerHTML = operation[0].toString().substring(0, 12);
        else display.innerHTML = operation[0];
    }
    
    //checks for overflow on integers, otherwise prints current result to display
    else {
        if (operation[0] && operation[0].toString().length > 12) {
            operation[0] = 'overflow';
            display.innerHTML = operation[0];
        }
        else operation[0] ? display.innerHTML = operation[0] : display.innerHTML = '';
    }
}

//operation functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return ((y !== 0) ? x / y : 'undefined');
}

function operate(x, operator, y) {
    console.log(operator(x,y));
    return operator(x, y);
}
