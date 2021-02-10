import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn?.addEventListener("click", up_view);
    sign_in_btn?.addEventListener("click", in_view);

    function up_view() {
      container?.classList.add("sign-up-mode");
    }

    function in_view() {
      container?.classList.remove("sign-up-mode");
    }
  }

  
 

}
