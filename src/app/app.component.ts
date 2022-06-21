import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projektweb';
  user$: Observable<User | undefined>;
  constructor(private userService: UserService) {
    // this.subscription = userService.onUserChange()
    //   .subscribe(value => {
    //     this.user = value;
    //   });

    this.user$ = userService.onUserChange();
  }

  logout() {
    this.userService.logout()
  }
}
