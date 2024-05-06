import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent {
  drivers: { name: string, type: string }[] = [];
  selectedDriver: string | null = null;
  driverOptions: { name: string, description: string, defaultValue: string, value?: any }[] = [];
  selectedDriverName: string | null = null; 

  constructor(private schemaService: SchemaService) {
    this.schemaService.loadDriverSchemas();
    this.loadDrivers();
  }

  private loadDrivers(): void {
    this.drivers = [];
    Array.from(this.schemaService.getAllDriverFiles()).forEach(file => {
      const xmlContent = require(`../../../assets/ppx drivers/${file}`);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent.default, 'text/xml');
      const driverName = xmlDoc.querySelector('Driver')?.getAttribute('Name') || 'Unknown Driver';
      const driverType = xmlDoc.querySelector('Feature')?.getAttribute('ID') || '';
      this.drivers.push({ name: driverName, type: driverType });
    });
  }
  

  // showDriverOptions(driver: { name: string, type: string }): void {
  //   this.selectedDriver = driver.type;
  //   this.selectedDriverName = driver.name; 
  //   const schema = this.schemaService.getDriverSchema(driver.type);
  //   if (schema) {
  //     this.driverOptions = this.extractOptionsFromSchema(schema);
  //   } else {
  //     this.driverOptions = [];
  //   }
  // }

  // private extractOptionsFromSchema(schema: string): { name: string, description: string, defaultValue: string, value: string }[] {
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(schema, 'text/xml');
  //   const options = Array.from(xmlDoc.getElementsByTagName('Option'));
  //   return options.map(option => {
  //       const name = option.getAttribute('Name') || '';
  //       const description = option.getAttribute('Description') || '';
  //       const defaultValue = option.getAttribute('DefaultValue') || '';
  //       const value = option.getAttribute('Value') || defaultValue;
  //       return { name, description, defaultValue, value };
  //   });
  // }
}
