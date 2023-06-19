import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDataDetail } from '@microsoft/signalr/dist/esm/Utils';

@Component({
  selector: 'app-entrepreneurAssessments',
  templateUrl: './entrepreneurAssessments.component.html',
  styleUrls: ['./entrepreneurAssessments.component.scss']
})
export class EntrepreneurAssessmentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.getdata();
    const items = document.querySelectorAll(".accordion button");
function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}
items.forEach(item => item.addEventListener('click', toggleAccordion));
  }
getdata(){
  const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    const pTag = radioButton.parentNode.previousSibling;
    if (pTag && pTag.nodeName === 'P') {
      pTag.parentNode.removeChild(pTag);
      radioButton.parentNode.parentNode.removeChild(radioButton.parentNode);
    }
  });
}); 
}
navigateToCompany(){
  this.router.navigate(['/CompanyProfile']);
}
}
