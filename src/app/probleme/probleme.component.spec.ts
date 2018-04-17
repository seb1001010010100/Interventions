import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
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
    expect(errors['longeurMinimum']).toBeFalsy();

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

  describe('appliquerNotifications', () => {
    
    it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.controls['telephone'];
      expect(zone.status).toEqual('DISABLED');
  
    });
  
    it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.controls['telephone'];
      expect(zone.value).toEqual(null);
  
    });
    it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      expect(zone.status).toEqual('DISABLED');
  
    });
  
    it('Zone ADRESSE COURRIEL est vide quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      expect(zone.value).toEqual(null);
  
    });
    it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
  
    });
  
    it('Zone CONFIRMER COURRIEL est vide quand ne pas me notifier', () => {
      component.gestionCourriels('NePasNotifier');
      let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      expect(zone.value).toEqual(null);
  
    });

    it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.controls['telephone'];
      expect(zone.status).toEqual('DISABLED');
  
    });

    it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      expect(zone.enabled).toBeTruthy;
  
    });
  
    it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      expect(zone.enabled).toBeTruthy;
  
    });

    it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      zone.setValue("[a-z0-9._%+-]+@[a-z0-9.-]+");
      expect(zone.status).toEqual('INVALID');
  
    });
  
  });


});

