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

    it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
      let errors = {};
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      let zoneConfirmation = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      zone.setValue("");
      zoneConfirmation.setValue("a@valeurvalide.ca");
      let groupe = component.problemeForm.get('courrielsGroup');
      errors = groupe.errors || {};
      expect(errors['courrielConfirmation']).toBeUndefined();
    });

    it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
      let errors = {};
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      let zoneConfirmation = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      zone.setValue("a@valeurvalide.ca");
      zoneConfirmation.setValue("");
      let groupe = component.problemeForm.get('courrielsGroup');
      errors = groupe.errors || {};
      expect(errors['courrielConfirmation']).toBeUndefined();
    });

    it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      let errors = {};
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      let zoneConfirmation = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      zone.setValue("a@angular.com");
      zoneConfirmation.setValue("b@angular.com");
      let groupe = component.problemeForm.get('courrielsGroup');
      errors = groupe.errors || {};
      expect(errors['courrielConfirmation']).toBeTruthy;
  
    });

    it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      let errors = {};
      component.gestionCourriels('ParCourriel');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      let zoneConfirmation = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      zone.setValue("a@angular.com");
      zoneConfirmation.setValue("a@angular.com");
      let groupe = component.problemeForm.get('courrielsGroup');
      errors = groupe.errors || {};
      expect(errors['courrielConfirmation']).toBeUndefined();
    });

    it('Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      expect(zone.enabled).toBeTruthy;
  
    });

    it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('courrielsGroup.courriel');
      expect(zone.disabled).toBeTruthy;
  
    });

    it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
      expect(zone.disabled).toBeTruthy;
  
    });

    it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("");
      expect(zone.invalid).toBeTruthy;
  
    });

    it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("");
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone TELEPHONE est invalide avec des caractères nonnumériques quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("[0-9]+");
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("9".repeat(9));
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("9".repeat(11));
      expect(zone.status).toEqual('INVALID');
  
    });

    it('Zone TELEPHONE est invalide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
      component.gestionCourriels('ParTelephone');
      let zone = component.problemeForm.get('telephone');
      zone.setValue("9".repeat(10));
      expect(zone.status).toEqual('VALID');
  
    });

  });


});

