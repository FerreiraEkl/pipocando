import crypto from 'crypto'

class cripto {
    encriptPassword(password: string): string {
        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(password, 'utf8', 'hex')
        mystr += mykey.final('hex');
        return mystr;
    }

    compare(password: string, hash: string): boolean {
        var encripted = crypto.createCipher('aes-128-cbc', 'mypassword');
        var encriptedFull = encripted.update(password, 'utf8', 'hex')
        encriptedFull += encripted.final('hex');
        
        if (encriptedFull === hash) {
            return true;
        }

        return false;
    }
}

export default new cripto()