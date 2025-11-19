import { COLORS } from '../helpers/colors.ts';
/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChanges: boolean;

    constructor(content: string, cursorPosition: number, unsaveChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsaveChanges = unsaveChanges;
    }

    displayState(): void {
        console.log('%cEstado del Editor', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Posición del cursor: ${this.cursorPosition}
            Cambios no guardados: ${this.unsaveChanges}
        `);
    }

    copyWith({
        content,
        cursorPosition,
        unsaveChanges,
    }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsaveChanges ?? this.unsaveChanges
        );
    }
}

class CodeEditorHistory {

    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    save( state: CodeEditorState ): void {
        if ( this.currentIndex < this.history.length - 1 ) {
            this.history = this.history.splice(0, this.currentIndex + 1);
        }

        this.history.push(state);
        this.currentIndex++;
    }

    undo(): CodeEditorState | null {
        if ( this.currentIndex > 0 ) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }

        return null;
    }

    redo(): CodeEditorState | null {
        if ( this.currentIndex < this.history.length - 1 ) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }

        return null;
    }

}

function main() {

    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState(
        "console.log('Hola Mundo!')",
        2,
        false
    );
        
    history.save(editorState);

    console.log('%cEstado inicial', COLORS.blue);
    editorState.displayState();
    
    console.log('%cDespues del primer cambio', COLORS.blue);
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo!')\nconsole.log('Nueva linea')",
        cursorPosition: 4,
        unsaveChanges: true,
    });
    history.save(editorState);
    editorState.displayState();

    console.log('%cDespues de mover el cursor', COLORS.blue);
    editorState = editorState.copyWith({
        cursorPosition: 56,
    });
    history.save(editorState);
    editorState.displayState();
    
    console.log('%cDespues de hacer undo', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    console.log('%cDespues de hacer redo', COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();

}

main();

