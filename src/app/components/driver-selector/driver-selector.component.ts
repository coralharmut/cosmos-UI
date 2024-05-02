import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent {
  drivers: string[] = [];

  constructor(private schemaService: SchemaService) {
    this.loadDrivers();
  }

  private loadDrivers(): void {
    this.drivers = Array.from(this.schemaService.getAllDriverTypes());
  }
}
