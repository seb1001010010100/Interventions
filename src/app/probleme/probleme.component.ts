import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierEspaceValidator } from '../shared/caracteres-validator';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

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
      telephone: [''],
      courrielsGroup: this.fb.group({

        courriel: [{value:''}],
        courrielConfirmation: [{value:''}]
      })
    });

    this.problemes.obtenirProblemes().subscribe(cat => this.typeProblemes = cat, error => this.errorMessage = <any>error);

  }//ngOnInit

  gestionCourriels(typeNotification: String): void{

    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielsGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielsGroup.courrielConfirmation');

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

      courrielControl.enable();
      courrielControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);

    }else if(typeNotification === 'ParCourriel'){

      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required]);

    }
    courrielControl.updateValueAndValidity();

  }

}
