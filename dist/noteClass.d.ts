/**
 * Clase para manipular notas
 */
export declare class NoteClass {
    private user;
    /**
     * Constructor de la clase. Recibe el nombre del usuario cuyas notas serán manipuladas.
     * @param user Usuario cuyas notas serán manipuladas
     */
    constructor(user: string);
    /**
     * Dadas las propiedades de una nota, genera una cadena String con dicha información representada con la sintaxis de JSON.
     * @param title Título de la nota
     * @param body Contenido de la nota
     * @param color Color con el que imprimir la nota
     */
    getJSON(title: string, body: string, color: string): string;
    /**
     * Crea una nueva nota que se almacena en un fichero JSON. Si la nota ya existe emite un mensaje de error.
     * @param title Título de la nota
     * @param body Contenido de la nota
     * @param color Color con el que imprimir la nota
     */
    addNote(title: string, body: string, color: string): void;
    /**
     * Borra una nota. Si la nota no existe emite un mensaje de error.
     * @param title Título de la nota
     */
    rmNote(title: string): void;
    /**
     * Lista todas las notas del usuario imprimiendo el nombre de cada nota con el color indicado en su contenido.
     */
    lsNote(): void;
    /**
     * Lee una nota. Si la nota no existe emite un mensaje de error.
     * @param title Título de la nota.
     */
    readNote(title: string): void;
    /**
     * Modifica una nota. Si la nota no existe emite un mensaje de error.
     * @param title Título de la nota
     * @param ntitle Opcional - Nuevo título.
     * @param body Opcional - Nuevo body.
     * @param color Opcional - Nuevo color
     */
    modifyNote(title: string, ntitle: string | unknown, body: string | unknown, color: string | unknown): void;
}
