export class user {
    name: string;
    nick: string;
    email: string;
    email2: string;
    nationality: number;
    passwd: string;
    terms: boolean;

    constructor(name: string, nick: string, email: string, email2: string, nationality: number, passwd: string, terms: boolean) {
        this.name = name;
        this.nick = nick;
        this.email = email;
        this.email2 = email2;
        this.nationality = nationality;
        this.passwd = passwd;
        this.terms = terms;
    }
}