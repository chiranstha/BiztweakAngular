import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
type Tabs = 'Parent' | 'Address' | 'AcademicBackground';
@Component({
  selector: 'app-entrepreneurLMS',
  templateUrl: './entrepreneurLMS.component.html',
  styleUrls: ['./entrepreneurLMS.component.scss']
})
export class EntrepreneurLMSComponent extends AppComponentBase  implements OnInit {
  activeTab: Tabs = 'Parent';
  constructor(private injector: Injector,    
   ) {  super(injector) }

  ngOnInit() {
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
  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }
}
