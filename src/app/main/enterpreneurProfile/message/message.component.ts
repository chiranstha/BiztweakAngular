import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  showDropdown: boolean;
  constructor() { }

  ngOnInit() {
    this.showDropdown = false;
  }

}
