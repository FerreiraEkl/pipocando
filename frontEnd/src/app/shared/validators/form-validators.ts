import { FormControl } from "@angular/forms";
import { AuthService } from "src/app/modules/auth/auth.service";

export class FormValidations {
    static authService: AuthService;

    constructor(private authService: AuthService) {

    }

    static checkRegiterEmail(control: FormControl) {
        const email = control.value;

        if (email && email !== '') {
            //this.authService.checkRegisteredEmail(email).then(isRegistered=>{
             //   return isRegistered
             //return { unregistered: true }
           // });
        }

        return null;
    }

    static checkRegisterLogin(control: FormControl) {
        const login = control.value;

        if (login && login !== '') {

        }

        return null;
    }

    static checkValidPassword(control: FormControl) {
        const password = control.value;

        if (password && password !== '') {
            // se não atender a condição de validação
            if (true) {
                // retornar objeto com tipo do erro
                return { invalidPassword: true }
            }
        }


        return null;
    }
}