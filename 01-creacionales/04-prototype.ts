/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
    public title: string;
    private content: string;
    public author: string;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    clone(): Document {
        return new Document(this.title, this.content, this.author);
    }

    displayInfo() {
        console.log(`
            Title: ${this.title}
            Content: ${this.content}
            Author: ${this.author}
        `);
    }
}

function main() {

    const document = new Document('Cotizacion', '500 dolares', 'Maximiliano');
    console.log({document});
    document.displayInfo();

    // const document2 = { ...document };
    // const document2 = structuredClone(document);
    const document2 = document.clone();
    document2.title = 'Nueva Cotizacion';
    console.log({document2});
    document2.displayInfo();

}

main();
