import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLinkedCompaniesComponent } from './office-linked-companies.component';

describe('OfficeLinkedCompaniesComponent', () => {
  let component: OfficeLinkedCompaniesComponent;
  let fixture: ComponentFixture<OfficeLinkedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeLinkedCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficeLinkedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
