'use strict'
// para recoger los parametros pasados por consola
var params = process.argv.slice(2);

// pasamos a float los parametros (2 parametros)
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

// desde la consola se ejecuta asi: node calculadora.js valor1 valor2
//ejemplo: node calculadora.js 4 2