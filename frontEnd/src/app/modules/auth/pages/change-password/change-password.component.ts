import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      hash: ['', Validators.required],
      password: ['', [Validators.required, this.hasFormat]],
      passwordConfirm: ['', [Validators.required, this.hasFormat]]
    });
  }

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      if (params['hash'])
        this.changePasswordForm.patchValue({
          hash: params['hash']
        })
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid && !this.verifyEquals('passwordConfirm')) {
      this.authService.setNewPassword(this.changePasswordForm.value).then(result => {
        if (result !== true)
          return M.toast({ html: result.toString() });

        M.toast({ html: 'Senha alterada com sucesso efetue login com sua nova senha' });
        this.router.navigate(['']);
      })
    }
  }

  hasFormat(control: FormControl) {
    const password: string = control.value;

    if (password && password !== '') {
      // deverá conter no mínimo 8 caracteres, dos quais deve possuir no mínimo 1 letra, 1 número e 1 caractere especial.
      const teste = /(?=.*[}{,.^?~=+\-_\/*\-+.\|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/;

      return teste.test(password) ? null : { invalid: true };
    }

    return null;
  }

  verifyValid(field: string) {
    return (
      this.changePasswordForm.get(field).hasError('invalid') &&
      !this.changePasswordForm.get(field).hasError('required') &&
      (this.changePasswordForm.get(field).touched || this.changePasswordForm.get(field).dirty)
    )
  }

  verifyRequired(field: string) {
    return (
      this.changePasswordForm.get(field).hasError('required') &&
      (this.changePasswordForm.get(field).touched || this.changePasswordForm.get(field).dirty)
    )
  }

  verifyEquals(field: string) {
    return (
      (this.changePasswordForm.get('password').value != this.changePasswordForm.get(field).value) &&
      !this.changePasswordForm.get(field).hasError('invalid') &&
      !this.changePasswordForm.get(field).hasError('required') &&
      (this.changePasswordForm.get(field).touched || this.changePasswordForm.get(field).dirty)
    )
  }
}
