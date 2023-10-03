import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
} from 'primeng/api';
import { Contact } from 'src/app/core/models/Contact';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  //variables necesarias
  selectedSize = 'p-datatable-sm';

  public formContact: FormGroup;

  public contacts: Contact[] = [];
  total: number;
  totalRecords!: number;
  loading: boolean = false;
  public lazy = true;

  visibleDialog: boolean = false;
  visibleUpdateDialog: boolean = false;
  visibleConfirm: boolean = false;
  //Opciones de acciones solo excel
  items: MenuItem[] = [
    {
      label: 'Descargar Excel',
      icon: 'pi pi-file-excel',
      command: () => {
        this.downloadExcel();
      },
    },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService,
    private fb: FormBuilder
  ) {
    //Campos del formulario
    this.formContact = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]],
    });
  }

  ngOnInit(): void {}

  //No implementada
  updateContact(contact: Contact) {
    this.visibleUpdateDialog = true;
    this.formContact.patchValue({
      name:contact.name,
      lastName:contact.lastName,
      email:contact.email,
      phone:contact.phone,
    })


    this.contacts = this.contacts.map((elemento) => {
      if (elemento._id === contact._id) {
        // Si el ID coincide, crea un nuevo objeto con las modificaciones
        return { ...elemento, nombre: contact.name, lastName: contact.lastName, phone: contact.phone, email: contact.email };
      } else {
        // Si no coincide, devuelve el elemento sin cambios
        return elemento;
      }
    });
  }
  //Guarda el contacto
  saveContact() {
    let newContact: Contact = new Contact();

    //verificacion de informacion
    if (
      this.formContact.value.email == '' ||
      this.formContact.value.name == '' ||
      this.formContact.value.lastName == '' ||
      this.formContact.value.phone == ''
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Verificar información',
        detail: `Porfavor verifique que los campos tengan información`,
      });
      return;
    } else {
      //atributos del contacto
      newContact._id = this.contacts.length;
      newContact.email = this.formContact.value.email;
      newContact.name = this.formContact.value.name;
      newContact.lastName = this.formContact.value.lastName;
      newContact.phone = this.formContact.value.phone;

      this.contacts.push(newContact);

      this.visibleDialog=false;

      this.messageService.add({
        severity: 'success',
        summary: 'Registro Exitoso',
        detail: `El contacto se guardo de manera exitosa`,
      });

      //Formateo de formulario
      this.formContact.reset();
      this.formContact.value.email = '';
      this.formContact.value.name = '';
      this.formContact.value.lastName = '';
      this.formContact.value.phone = '';

      //Cantidad de contactos
      this.total = this.contacts.length;
    }
  }
  //Elimina un contacto de la lista
  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar el contacto?`,
      header: 'Confirmar',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.contacts = this.contacts.filter(
          (elemento) => elemento._id !== contact._id
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminacion Exitosa',
          detail: `El contacto se elimino de manera exitosa`,
        });
      }})
    this.total = this.contacts.length;
  }
  //Habilita el menu si se desea
  changeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('hide');
  }
  //Funcion para descargar Excel
  downloadExcel() {
    let filterList: any[] = [];

    if (this.contacts.length == 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Ingresar Información',
        detail: `Porfavor Ingrese informacion para realizar la accion`,
      });
      return;
    } else {
      this.contacts.forEach((element) => {
        filterList.push({
          id: element._id,
          Nombre: element.name,
          Apellido: element.lastName,
          Correo: element.email,
          Celular: element.phone,
        });
      });
      this.excelService.downloadExcel(filterList, 'Contactos');
    }
  }
  //Despliega el modal 
  showHistory() {
    this.visibleDialog = true;
    this.formContact.patchValue({});
  }
}
