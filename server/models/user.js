class user{
 
    emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    textPattern = /^[A-Za-z]+$/;
    textPattern2 = /^[A-Za-z0-9_-]+$/;
    
    constructor(name, nick, passwd, email, email2, nationality, terms){
        this.name = name;
        this.nick = nick;
        this.passwd = passwd;
        this.email = email;
        this.email2 = email2;
        this.nationality = nationality;
        this.terms = terms;
    }

    /**
     * Se valida toda la información que se ha recibido de los campos de registro
     * una vez validada, si todo esta correcto, se subirá a la BBDD el nuevo usuario
     */
    validate(){
        console.log(' ESTOY AQUI: nombre: ' + this.name + 
        ' nick: ' + this.nick +
        ' passwd: ' + this.passwd +
        ' email: ' + this.email +
        ' email2: ' + this.email2 +
        ' nacionalidad: ' + this.nationality +
        ' terminos aceptados: ' + this.terms);

        if (this.name === "" || this.nick === "" || this.email === "" || this.email2 === "" || this.passwd === "" || !this.emailPattern.test(this.email) || !this.emailPattern.test(this.email2) || !this.textPattern.test(this.name) || !this.textPattern2.test(this.passwd) || !this.textPattern2.test(this.nick) || !this.textPattern2.test(this.passwd) || this.nick.length > 12 ||  this.passwd.length < 8 || isNaN(this.nationality) || !this.terms) {
            alert("Por favor, rellena todos los campos correctamente");
            return false;
        } else {
            if (this.email != this.email2) {
                alert("Los correos no coinciden");
                return false;
            } else {
                return true;
            }
        }
    }
}

module.exports = user;