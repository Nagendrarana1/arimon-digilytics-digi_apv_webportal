import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholderDocumentValidationComponentComponent } from './shareholder-document-validation.component';

describe('ShareholderDocumentValidationComponentComponent', () => {
  let component: ShareholderDocumentValidationComponentComponent;
  let fixture: ComponentFixture<ShareholderDocumentValidationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareholderDocumentValidationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareholderDocumentValidationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
