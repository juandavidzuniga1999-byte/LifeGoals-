import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../model/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metas: Meta[] = [];       // lista de metas
  nuevaMeta: string = '';   // texto del input

  constructor(private metaService: MetaServiceService) {}

  ngOnInit(): void {
    // Al cargar el componente, obtiene las metas de Firestore
    this.metaService.getMetas().subscribe(data => {
      this.metas = data;
    });
  }

  // Agregar meta
  agregar() {
    if (this.nuevaMeta.trim() === '') return; // no agrega si está vacío
    this.metaService.addMeta(this.nuevaMeta).then(() => {
      this.nuevaMeta = ''; // limpia el input después de agregar
    });
  }

  // Eliminar meta
  eliminar(id: string) {
    this.metaService.deleteMeta(id);
  }
}
