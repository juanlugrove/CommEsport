import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscarequipo',
  templateUrl: './buscarequipo.component.html',
  styleUrls: ['./buscarequipo.component.css']
})
export class BuscarequipoComponent implements OnInit {
  formPostulacion: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.formPostulacion=formBuilder.group({
      description: ['', Validators.required],
      video: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

}
