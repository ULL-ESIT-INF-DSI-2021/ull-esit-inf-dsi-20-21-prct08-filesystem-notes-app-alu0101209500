export declare class NoteClass {
    private user;
    constructor(user: string);
    getJSON(title: string, body: string, color: string): string;
    addNote(title: string, body: string, color: string): void;
    rmNote(title: string): void;
    lsNote(): void;
    readNote(title: string): void;
    modifyNote(title: string, ntitle: string | unknown, body: string | unknown, color: string | unknown): void;
}
