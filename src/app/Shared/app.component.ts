import { Component, OnInit } from '@angular/core';
import { Router, Event } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isPanelShow = false;
  constructor(
    private router: Router) {

  }

  ngOnInit() {

    // this will call the when router will change
    this.router.events.subscribe((event: Event) => {
      if (localStorage.getItem("userAccessToken") != null) {
        this.isPanelShow = true;
      }
      else {
        this.isPanelShow = false;
      }
    });
  }

  logout() {

    localStorage.removeItem('userAccessToken');
    this.router.navigate(['/login']);

  }
}
