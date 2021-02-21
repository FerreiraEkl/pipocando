import { FormControl } from "@angular/forms";

export class FormAnimations {

    constructor() {

    }

    static exitComponent(control: FormControl) {
        const email = control.value;

        if (email && email !== '') {
            //this.authService.checkRegisteredEmail(email).then(isRegistered=>{
             //   return isRegistered
             //return { unregistered: true }
           // });
        }

        return null;
    }
}