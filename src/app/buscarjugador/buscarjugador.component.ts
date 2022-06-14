import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscarjugador',
  templateUrl: './buscarjugador.component.html',
  styleUrls: ['./buscarjugador.component.css']
})
export class BuscarjugadorComponent implements OnInit {
  formPostulacion: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.formPostulacion=formBuilder.group({
      description: ['', Validators.required],
      position: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

}
