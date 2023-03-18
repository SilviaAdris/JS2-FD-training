let lastNumber = '';
let checkOperate = false;

function displayNumber(number){
    let output = document.querySelector('.output');
    if(number === '.' && lastNumber.includes('.')){
        checkOperate = false;
        return 0;
    }   
    else if(number === '.' && output.innerHTML === '0') {
        lastNumber = '0' + number;
        output.innerHTML = lastNumber;
        console.log(lastNumber);
    }
    else if(number === '.' && lastNumber === '') {
        lastNumber = '0' + number;
        output.innerHTML += lastNumber;
        console.log(lastNumber);
        if(checkOperate || number === '0')
        {
            return;
        }
    }
    else{
      lastNumber += number;
      output.innerHTML = output.innerHTML === '0'?number: output.innerHTML + number;
      console.log(lastNumber);
      if(checkOperate || number === '0')
        {
          return;
        }     
      if(number === '.'){
        checkOperate = false;
        }
      else{
      checkOperate = !checkOperate;
      }
    }   
}

function displayOperation (operationValue){
  if(checkOperate){
  let output = document.querySelector('.output');
  output.innerHTML = output.innerHTML === '0'?output.innerHTML:output.innerHTML + operationValue;
  checkOperate = !checkOperate;
  lastNumber = '';
  }else{
  return;
  }
}

function keyPress(event){
  let number = event.keyCode;
  let operations = [107,111,109];
  if ((number >= 48 && number <= 57)) { 
    displayNumber(String.fromCharCode(number));
  }
  else if((number >= 96 && number <= 105)){
    displayNumber(String.fromCharCode(number-48));
  }
  else if (number === 110){
    displayNumber(String.fromCharCode(number-64));
  }
  else if(number === 13){
    operate();
  }
  else if(operations.includes(number)){
    displayOperation(String.fromCharCode(number-64));
  }
  else if(number === 106){
    displayOperation('×');
  }
  else if(number === 8){
    del();
  }
}

function clear(){
      let output = document.querySelector('.output');
      let results = document.querySelector('.result');
      results.innerHTML = '0';
      output.innerHTML = '0';
      checkOperate = false;
      return 0;
}

function del(){
    let output = document.querySelector('.output');
    if(output.innerHTML !== '0'){
      output.innerHTML = output.innerHTML.slice(0,-1);
      if(output.innerHTML === ''){
        output.innerHTML = '0';
      } 
    }
}

function add(firsNumber, secondNumber){
    return firsNumber + secondNumber;
}

function sub(firsNumber, secondNumber){
    return firsNumber - secondNumber;
}

function divide(firsNumber, secondNumber){
        return firsNumber / secondNumber;
}

function multiply(firsNumber, secondNumber){
    return firsNumber * secondNumber;
}

function operate(){
    let operation = document.querySelector('.output').innerHTML;
    let lastOperation = '';
    let newNumber = '';
    let result = 0;
    let checkFirstNumber = true;
    let operations = ['×','/','+','-']; 
    for(let i=0;i<operation.length;i++){
      if(operations.some(k => operation.charAt(i).includes(k))){
        if(!checkFirstNumber){
        switch (lastOperation) {
          case '+':
            result = add(result, parseFloat(newNumber));
            newNumber = '';
            lastOperation = operation.charAt(i);
            break;
          case '-':
            result = sub(result, parseFloat(newNumber));
            newNumber = '';
            lastOperation = operation.charAt(i);
            break;
          case '×':
            result = multiply(result, parseFloat(newNumber));
            newNumber = '';
            lastOperation = operation.charAt(i);
            break;
          case '/':
            result = divide(result, parseFloat(newNumber));
            newNumber = '';
            lastOperation = operation.charAt(i);
         }
        }
        else{
          result = add(result, parseFloat(newNumber));
          newNumber = '';
          checkFirstNumber = !checkFirstNumber;
          lastOperation = operation.charAt(i);
        }
        
      }
      else{
        newNumber += operation.charAt(i);
      }
    } 
    switch (lastOperation) {
          case '+':
            result +=  parseFloat(newNumber);
            break;
          case '-':
            result -= parseFloat(newNumber);
            break;
          case '×':
            result *= parseFloat(newNumber);
            break;
          case '/':
            result /= parseFloat(newNumber);
         }
    let output = document.querySelector('.result');
    if(isNaN(result)){
        window.alert('Error! remove the last operation');
    }
    else if(!isFinite(result)){
        window.alert('Can\'t divide by zero');
    }
    else{
    output.innerHTML = (result % 1 === 0)?result:result.toFixed(3);
        }
  }

let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let equalButton = document.querySelector('.equal');
let clearButton = document.querySelector('.all-clear');
let deleteButton = document.querySelector('.delete');
for(let i=0;i<numbers.length;i++){
    let number = numbers[i];
    number.addEventListener('click',() => displayNumber(number.innerHTML));
}
for(let i=0;i<operations.length;i++){
    let operation = operations[i];
    operation.addEventListener('click',() => displayOperation(operation.innerHTML));
}
equalButton.addEventListener('click', () => operate());
clearButton.addEventListener('click', () => clear());
deleteButton.addEventListener('click', () => del());
addEventListener("keydown", () => keyPress(event));