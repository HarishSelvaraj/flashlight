import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentManagerComponent } from './document-manager/document-manager.component';



describe('MasterDocumentComponent', () => {
  let component: DocumentManagerComponent;
  let fixture: ComponentFixture<DocumentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
