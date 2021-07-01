import { AccountService } from './../../services/account.service';
import { LoginVM } from './../../models/login-vm';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: string[];
  message: string;
  loading = false;

  logForm: any;
  formLoginSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.createFrom();
  }

  createFrom() {
    this.logForm = this.fb.group({
      Email: ["", Validators.required],
      Password: ["", Validators.required]
    });
  }

  async onLoginFormSubmit() {
    this.errors = [];
    this.message = null;
    this.formLoginSubmitAttempt = true;
    let model: LoginVM = this.logForm.value;
    if (this.logForm.valid) {
      this.loading = true;

      this.accountService.login(model).subscribe(
        (result: any) => {
          console.log(result);
          localStorage.setItem('userAccessToken', result.accessToken);
          this.router.navigate(['/profile']);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            // handle validation error
            let validationErrorDictionary = err.error.errors;
            for (let fieldName in validationErrorDictionary) {
              if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                this.errors.push(validationErrorDictionary[fieldName]);
              }
            }
          }
        });

      this.loading = false;
    }
  }
}
