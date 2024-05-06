import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent {
  drivers: { name: string, type: string, options: any[] }[] = [];
  selectedDriver: { name: string, type: string, options: any[] } | null = null;
  
  constructor(private schemaService: SchemaService) {
    this.schemaService.loadDriverSchemas();
    this.loadDrivers();
  }

  private loadDrivers(): void {
    this.drivers = Array.from(this.schemaService.getAllDriverFiles()).map(file => {
      const xmlContent = require(`../../../assets/ppx drivers/${file}`);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent.default, 'text/xml');
      const driverName = xmlDoc.querySelector('Driver')?.getAttribute('Name') || 'Unknown Driver';
      const driverType = xmlDoc.querySelector('Feature')?.getAttribute('ID') || '';
      const driverOptions = this.extractOptionsFromSchema(xmlContent.default);
      return { name: driverName, type: driverType, options: driverOptions };
    });
  }
  

  showDriverOptions(driver: { name: string, type: string, options: any[] }): void {
    this.selectedDriver = driver; // Update selected driver
  }  

  private extractOptionsFromSchema(schema: string): { name: string, description: string, defaultValue: string, value: string }[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(schema, 'text/xml');
    const options = Array.from(xmlDoc.getElementsByTagName('Option'));
    return options.map(option => {
        const name = option.getAttribute('Name') || '';
        const description = option.getAttribute('Description') || '';
        const defaultValue = option.getAttribute('DefaultValue') || '';
        const value = option.getAttribute('Value') || defaultValue;
        return { name, description, defaultValue, value };
    });
  }
}
