import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/common/app-component-base";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
    selector: 'courserecommendationModal',
    templateUrl: './courseRecommendation-modal.component.html'
  })

export class courseRecommendationModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    id: any;

  form: FormGroup;
    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private route: ActivatedRoute,

      ) {
        super(injector);
      }  
    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.createForm();
    
    }
    createForm(item: any = {}) {
        this.form = this.fb.group({
          id: [item.id ? item.id : this.emptyguId],
          name: [item.name ? item.name : '', Validators.required],
          description: [item.description ? item.description : '', Validators.required]
        });
      }
    show(){
        this.active = true;
        this.modal.show()
    }
    showEdit(){
        this.active = true;
        this.modal.show();
    }
    save(){}
    close(){
        this.active = true;
        this.modal.hide();
    }
}