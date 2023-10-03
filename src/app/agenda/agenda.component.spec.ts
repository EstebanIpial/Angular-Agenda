import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './pages/list/agenda.component';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
