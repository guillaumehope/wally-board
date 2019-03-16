import { CandidatLoginComponent } from './candidat-login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';

describe('Component: CandidatLogin', () => {
  let component: CandidatLoginComponent;
  let fixture: ComponentFixture<CandidatLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AngularMaterialModule],
      declarations: [CandidatLoginComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CandidatLoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.form).toBeFalsy();
  });
});
