import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Login,
    Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor,multi:true}
  ],
  bootstrap: [App]
})
export class AppModule { }
