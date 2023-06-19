import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  constructor(private router: Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  NavigateToReg(){
    this.router.navigate(['/create']);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
