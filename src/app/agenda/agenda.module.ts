import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { AgendaComponent } from './pages/list/agenda.component';
import { DialogModule } from 'primeng/dialog';
// import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [AgendaComponent],
  providers: [MessageService,ConfirmationService],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    ReactiveFormsModule,
    TableModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    PanelModule,
    TooltipModule,
    MenuModule,
    DialogModule,
    
  ]
})
export class AgendaModule { }
