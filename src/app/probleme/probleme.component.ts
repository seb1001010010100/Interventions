import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierEspaceValidator } from '../shared/caracteres-validator';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { DISABLED } from '@angular/forms/src/model';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemes: ITypeProbleme[];
  errorMessage: String;
  constructor(private fb: FormBuilder, private problemes: TypeproblemeService) { }

  ngOnInit() {

    this.problemeForm = this.fb.group({

      prenom: ['',[Validators.required,VerifierEspaceValidator.sansEspace(),VerifierEspaceValidator.longueurMinimum(3)]],
      nom: ['',[Validators.required,VerifierEspaceValidator.sansEspace(),VerifierEspaceValidator.longueurMaximum(50)]],
      noTypeProbleme: ['', [Validators.required]],
      telephone: [{value: '', disabled:true}],
      notification: ['NePasNotifier'],
      courrielsGroup: this.fb.group({

        courriel: [{value:'',disabled:true}],
        courrielConfirmation: [{value:'',disabled:true}]
      },)
    });

    this.problemes.obtenirProblemes().subscribe(cat => this.typeProblemes = cat, error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges.subscribe(value=> this.gestionCourriels(value));
  }//ngOnInit

  gestionCourriels(typeNotification: String): void{

    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielsGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielsGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielsGroup');

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();



    if(typeNotification === 'ParCourriel'){

      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])]);
      courrielControl.enable();
      courrielControl.setValidators([Validators.required, Validators.email]);
      courrielConfirmationControl.enable();
      courrielConfirmationControl.setValidators([Validators.required, Validators.email]);
      
     

    }else if(typeNotification === 'ParTelephone'){

      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]);

    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();

  }

}
