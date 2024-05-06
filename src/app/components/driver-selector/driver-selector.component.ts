import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent {
  drivers: string[] = [];
  selectedDriver: string | null = null;
  driverOptions: { name: string, description: string, defaultValue: string, value?: any }[] = [];

  constructor(private schemaService: SchemaService) {
    this.schemaService.loadDriverSchemas();
  }

  showDriverOptions(driver: string): void {
    this.selectedDriver = driver;
    const schema = this.schemaService.getDriverSchema(driver);
    if (schema) {
      this.driverOptions = this.extractOptionsFromSchema(schema);
    } else {
      this.driverOptions = [];
    }
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
