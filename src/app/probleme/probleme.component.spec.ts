import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('champ du prénom invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['longeurMinimum']).toBeFalsy();

  });
  it('champ du prénom valide avec 3 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['longeurMinimum']).toBeTruthy();

  });
  it('champ du prénom valide avec 200 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['longeurMinimum']).toBeTruthy();

  });
  it('champ du prénom invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("");
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();

  });
  it('champ du prénom invalide avec 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a');
    errors = zone.errors || {};
    expect(errors['longeurMinimum']).toBeTruthy();

  });
  it('champ du prénom invalide avec 50 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(50));
    errors = zone.errors || {};
    expect(errors['sansEspace']).toBeFalsy();

  });
  it('champ du prénom invalide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();

  });
});
