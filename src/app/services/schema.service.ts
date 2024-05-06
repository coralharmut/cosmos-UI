import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private driverFiles: string[] = ['A_Schema.xml', 'B_Schema.xml']; 

  private driverSchemas: Map<string, { name: string, schema: string }> = new Map();

  constructor() { }

  loadDriverSchemas(): void {
    this.driverFiles.forEach(file => {
      const xmlContent = require(`../../assets/ppx drivers/${file}`);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent.default, 'text/xml');
      const driverNode = xmlDoc.getElementsByTagName('Driver')[0];
      const driverName = driverNode.getAttribute('Name') || 'Unknown Driver'; 
      const featureNodes = xmlDoc.getElementsByTagName('Feature');
      for (let i = 0; i < featureNodes.length; i++) {
        const driverType = featureNodes[i].getAttribute('ID') || '';
        const schema = featureNodes[i].outerHTML;
        this.driverSchemas.set(driverType, { name: driverName, schema: schema });
        console.log('data gathered:', driverName, driverType, schema)
      }
    });
  }

  getDriverSchema(driverType: string): string | undefined {
    const driverInfo = this.driverSchemas.get(driverType);
    return driverInfo ? driverInfo.schema : undefined;
  }

  getDriverName(driverType: string): string | undefined {
    const driverInfo = this.driverSchemas.get(driverType);
    return driverInfo ? driverInfo.name : undefined;
  }

  getAllDriverFiles(): string[] {
    return this.driverFiles;
  }

  getAllDriverTypes(): Iterable<string> {
    return this.driverSchemas.keys();
  }
}
