import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { History } from './components/history/history';
import { CommonModule } from '@angular/common';
import { Transfer } from './components/transfer/transfer';


@NgModule({
  declarations: [
    App,
    Login,
    Dashboard,
    History,
    Transfer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor,multi:true}
  ],
  bootstrap: [App]
})
export class AppModule { }
