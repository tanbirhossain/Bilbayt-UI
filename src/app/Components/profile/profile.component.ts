import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService) { }
  userInfo: any = {};
  async ngOnInit() {
    await this.loadUserInfo();
  }

  async loadUserInfo() {

    this.accountService.getUserInformation().subscribe(
      (result: any) => {
        console.log("userInfo: ", result);
        this.userInfo = result;

      },
      (err: HttpErrorResponse) => {

      });

  }
}
