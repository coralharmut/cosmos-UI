import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OneWebComponentsAngularModule } from '@one/angular';
import { CardComponent } from '../components/card/card.component';
import { AppComponent } from './app.component';
import { DriverSelectorComponent } from '../components/driver-selector/driver-selector.component';

@NgModule({
  declarations: [AppComponent, CardComponent, DriverSelectorComponent],
  imports: [BrowserModule, FormsModule, OneWebComponentsAngularModule],
  bootstrap: [AppComponent]
})

export class AppModule {}