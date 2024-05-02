import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OneWebComponentsAngularModule } from '@one/angular';
import { CardComponent } from '../components/card/card.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [BrowserModule, FormsModule, OneWebComponentsAngularModule],
  bootstrap: [AppComponent]
})

export class AppModule {}