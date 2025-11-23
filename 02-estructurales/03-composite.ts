/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails( indent?: string ): void;
}

class FileComponent implements FileSystemComponent {
    
    private name: string;

    constructor( name: string ) {
        this.name = name;
    }

    showDetails( indent?: string ): void {
        console.log(`${indent} - Archivo: ${this.name}`);
    }
}

class FolderComponent implements FileSystemComponent {
    private name: string;
    private contents: FileSystemComponent[] = [];

    constructor( name: string ) {
        this.name = name;
    }

    add( component: FileSystemComponent ): void {
        this.contents.push(component);
    }

    showDetails( indent: string = '' ): void {
        console.log(`${indent} + Carpeta: ${this.name}`);
        this.contents.forEach( component => component.showDetails( indent + ' '));
    }
}

function main() {
    const file1 = new FileComponent('file1.txt');
    const file2 = new FileComponent('file2.txt');
    const file3 = new FileComponent('file3.txt');
    const file4 = new FileComponent('file4.txt');

    const folder = new FolderComponent('folder');
    folder.add(file1);
    folder.add(file2);
    
    const folder2 = new FolderComponent('folder2');
    folder2.add(file3);
    
    const folder3 = new FolderComponent('folder3');
    folder3.add(file4);
    folder2.add(folder3);

    const folder5 = new FolderComponent('folder5');
    folder2.add(folder5);
    
    const rootFolder = new FolderComponent('root');
    rootFolder.add(folder);
    rootFolder.add(folder2);

    rootFolder.showDetails();
    
}

main();
