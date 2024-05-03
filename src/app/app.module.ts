import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OneWebComponentsAngularModule } from '@one/angular';
import { CardComponent } from './components/card/card.component';
import { AppComponent } from './app.component';
import { DriverSelectorComponent } from './components/driver-selector/driver-selector.component';
import { createCustomElement } from '@angular/elements';
import 'zone.js'

@NgModule({
  declarations: [AppComponent, CardComponent, DriverSelectorComponent],
  imports: [BrowserModule, FormsModule, OneWebComponentsAngularModule],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const moduleApp = createCustomElement(AppComponent, { injector: this.injector })
    customElements.define('app-root', moduleApp)
  }
}
