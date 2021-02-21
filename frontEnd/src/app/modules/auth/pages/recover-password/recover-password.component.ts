import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidations } from 'src/app/shared/validators/form-validators';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoverForm.valid)
      this.authService.recoverAccount(this.recoverForm.value).then(result => {
        if (result !== true)
          return M.toast({ html: result.toString() });

        M.toast({ html: 'Encaminhamos um email com os passos para recuperação de sua conta ;)' });
        this.router.navigate(['']);
      })
  }

  verifyRequired(field: string) {
    return (
      this.recoverForm.get(field).hasError('required') &&
      (this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty)
    )
  }

  verifyValid(field: string) {
    return (
      this.recoverForm.get(field).hasError('email') &&
      !(this.recoverForm.get(field).hasError('required')) &&
      (this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty)
    )
  }
}
