import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NoopAnimationsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: []
})
export class AppModule { }