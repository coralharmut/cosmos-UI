import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private driverFiles: string[] = ['A_Schema.xml', 'B_Schema.xml']; 

  private driverSchemas: Map<string, Map<string, string>> = new Map();

  constructor() { }

  loadDriverSchemas(): void {
    this.driverFiles.forEach(file => {
      const xmlContent = require(`../../assets/ppx drivers/${file}`);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent.default, 'text/xml');
      const driverNode = xmlDoc.getElementsByTagName('Driver')[0];
      const driverName = driverNode.getAttribute('Name') || 'Unknown Driver'; 
      const featureNodes = xmlDoc.getElementsByTagName('Feature');
      const driverSchemaMap: Map<string, string> = new Map();
      for (let i = 0; i < featureNodes.length; i++) {
        const driverType = featureNodes[i].getAttribute('ID') || '';
        const schema = featureNodes[i].outerHTML;
        driverSchemaMap.set(driverType, schema);
      }
      this.driverSchemas.set(driverName, driverSchemaMap);
    });
  }

  getDriverSchema(driverType: string): string | undefined {
    for (const schemaMap of this.driverSchemas.values()) {
      if (schemaMap.has(driverType)) {
        return schemaMap.get(driverType);
      }
    }
    return undefined;
  }

  getDriverName(driverType: string): string | undefined {
    for (const [driverName, schemaMap] of this.driverSchemas) {
      if (schemaMap.has(driverType)) {
        return driverName;
      }
    }
    return undefined;
  }

  getAllDriverFiles(): string[] {
    return this.driverFiles;
  }

  getAllDriverTypes(): Iterable<string> {
    const driverTypes: string[] = [];
    for (const schemaMap of this.driverSchemas.values()) {
      driverTypes.push(...Array.from(schemaMap.keys()));
    }
    return driverTypes;
  }
}
