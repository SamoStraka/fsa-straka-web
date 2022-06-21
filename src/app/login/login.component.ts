import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {} as User;
  wrongLogin = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    if(form.invalid){
      return;
    }

    this.userService.login(this.user)
      .subscribe((value : any) => {
        if(value){
          this.router.navigate(['/']);
        } else {
          this.wrongLogin = true
          setInterval(() => {
            this.wrongLogin = false;
          }, 2000)
        }
      })
  }

}
