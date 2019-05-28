'use strict'
// to collect the parameters passed by console
var params = process.argv.slice(2);

// we convert to float the parameters (2 parameters)
var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla =  `
La suma es: ${numero1+numero2}
La resta es: ${numero1-numero2}
La multiplicacion: ${numero1*numero2}
La division: ${numero1/numero2}		
`;

console.log(params);
console.log('Hola mundo con NodeJS');
console.log(plantilla);

// from the console runs like this: node calculator.js value1 value2
//example: node calculadora.js 4 2