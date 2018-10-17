import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinnerListComponent } from './components/sinner-list/sinner-list.component';
import { SinnerPrescriptedListComponent } from './components/sinner-prescripted-list/sinner-prescripted-list.component';

import { OptionsComponent } from './components/options/options.component';
import { HelpAboutComponent } from './components/help-about/help-about.component';

import { RefreshComponent } from './components/refresh/refresh.component';

const routes: Routes = [
  { path: '', component: SinnerListComponent },
  { path: 'sinner-list', component: SinnerListComponent },
  { path: 'sinner-prescripted-list', component: SinnerPrescriptedListComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'help-about', component: HelpAboutComponent },
  { path: 'refresh', component: RefreshComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
