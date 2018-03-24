import { VerifierEspaceValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    
    it('une chaîne vide est invalide', () =>{

        let control = {value: ""};
        let validator = VerifierEspaceValidator.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['prenom']).toBe(false);

    });


});