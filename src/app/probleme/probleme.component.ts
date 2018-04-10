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
      noTypeProbleme: ['']
    });

    this.problemes.obtenirProblemes().subscribe(cat => this.typeProblemes = cat, error => this.errorMessage = <any>error);

  }

}
