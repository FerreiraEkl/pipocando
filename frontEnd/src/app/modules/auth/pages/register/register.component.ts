import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userLogin: ['', Validators.required],
      userPassword: ['', Validators.required],
      userPasswordConfirm: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: [''],
      userMail: ['', [Validators.required,Validators.email]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      await this.authService.register(this.registerForm.value).then(result => {
        if (result) {
          return this.router.navigate(['confirmMail']);
        }
      })
    }
  }
}
