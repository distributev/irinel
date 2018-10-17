import 'zone.js/dist/zone-mix';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LeftMenuComponent } from './components/layout/left-menu/left-menu.component';

import { SinnerListComponent } from './components/sinner-list/sinner-list.component';
import { SinnerFormComponent, SinnerFormContentComponent } from './components/sinner-form/sinner-form.component';

import { SinnerPrescriptedListComponent } from './components/sinner-prescripted-list/sinner-prescripted-list.component';

import { HelpAboutComponent } from './components/help-about/help-about.component';
import { OptionsComponent } from './components/options/options.component';
import { RefreshComponent } from './components/refresh/refresh.component';

import { SinnersService } from './providers/sinners.service';
import { SinnersRepository } from './entities/sinner';
import { MessagesService } from './providers/messages.service';

import { AutofocusDirective } from './directives/autofocus.directive';
import { OptionsService } from './providers/options.service';
import { OptionsRepository } from './entities/option';
import { CryptingService } from './providers/crypting.service';
import { UtilsService } from './providers/utils.service';
import { SkinsComponent } from './components/skins/skins.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    HeaderComponent,
    LeftMenuComponent,
    SinnerListComponent,
    SinnerFormComponent,
    SinnerFormContentComponent,
    SinnerPrescriptedListComponent,
    OptionsComponent,
    HelpAboutComponent,
    RefreshComponent,
    SkinsComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, CryptingService, SinnersService, SinnersRepository, MessagesService, OptionsService, OptionsRepository, UtilsService],
  entryComponents: [SinnerFormContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
