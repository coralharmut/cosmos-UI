import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private driverSchemas: Map<string, string> = new Map();

  constructor() { }

  loadDriverSchemas(): void {
    const xmlContent = require('../../assets/ppx drivers/A_Schema.xml');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent.default, 'text/xml');
    const driverNodes = xmlDoc.getElementsByTagName('Feature');
    for (let i = 0; i < driverNodes.length; i++) {
      const driverType = driverNodes[i].getAttribute('ID') || '';
      const schema = driverNodes[i].outerHTML;
      this.driverSchemas.set(driverType, schema);
      console.log('data gathered:', driverType, schema)
    }
  }

  getDriverSchema(driverType: string): string | undefined {
    return this.driverSchemas.get(driverType);
  }

  getAllDriverTypes(): Iterable<string> {
    return this.driverSchemas.keys();
  }
}
