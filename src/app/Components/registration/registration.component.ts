import { AccountService } from './../../services/account.service';
import { RegisterVM } from './../../models/register-vm';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import "rxjs/Rx";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errors: string[];
  message: string;

  returnUrl: string;
  loading = false;
  regForm: any;

  formRegisterSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) { }



  ngOnInit() {
    this.createFrom();
  }
  createFrom() {
    this.regForm = this.fb.group({
      FullName: ["", Validators.required],
      Email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ["", Validators.required],
      ConfirmPassword: ["", Validators.required]

    });
  }
  async onRegisterFormSubmit() {
    this.errors = [];
    this.message = null;
    this.formRegisterSubmitAttempt = true;
    let model: RegisterVM = this.regForm.value;

    if (this.regForm.valid) {
      this.loading = true;

      this.accountService.registration(model).subscribe(
        (result: any) => {
          this.message = "Registration successfully.";
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
