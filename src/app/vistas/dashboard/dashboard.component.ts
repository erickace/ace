import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "0"){ // dashboard atleta
      this.router.navigate(['dashboard']);
    }else if(localStorage.getItem('username') && localStorage.getItem('es_entrenador') == "1"){ // dashboard couch
      this.router.navigate(['dashboardcouch']);
    }else{
      this.router.navigate(['login']);
    }
  }

}
