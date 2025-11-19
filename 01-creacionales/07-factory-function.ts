/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Language = 'en' | 'es' | 'fr';

// i18n
function createGreeter( lang: Language ) {

    return function ( name: string ) {

        const messages = {
            en: `Hello %c${name}!`,
            es: `¡Hola %c${name}!`,
            fr: `Bonjour %c${name}!`,
        };
        return console.log(messages[lang], COLORS.red);
    }

}

function main() {

    const spanishGreeter = createGreeter('es');
    const englishGreeter = createGreeter('en');
    const frenchGreeter = createGreeter('fr');
    
    spanishGreeter('Maximiliano');
    englishGreeter('Alice');
    frenchGreeter('Jean');

}

main();
