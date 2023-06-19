import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  NavigateToReg(){
    this.router.navigate(['/create']);
  }
}
