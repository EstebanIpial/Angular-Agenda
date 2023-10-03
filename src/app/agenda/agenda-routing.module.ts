import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './pages/list/agenda.component';

const routes: Routes = [
  { path: '', component: AgendaComponent},
  // {path: '', loadChildren: () => import('./agenda.module').then(m => m.AgendaModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
