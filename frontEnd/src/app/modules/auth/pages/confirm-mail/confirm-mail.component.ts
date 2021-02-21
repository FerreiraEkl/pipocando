import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth.service';
import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.css']
})
export class ConfirmMailComponent implements OnInit, AfterViewChecked, AfterContentInit {

  confirmMailForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.confirmMailForm = this.formBuilder.group({
      hash: ['', Validators.required],
    });
  }

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      if (params['hash'])
        this.confirmMailForm.setValue({
          hash: params['hash']
        })
    });
  }

  ngAfterViewChecked(): void {
    M.updateTextFields();
  }

  onSubmit() {
    this.authService.confirmMail(this.confirmMailForm.get('hash').value).then(result => {
      if (result) {
        M.toast({ html: 'Usuário validado com sucesso efetue login.' });
        return this.router.navigate(['']);
      }
    });
  }
}
