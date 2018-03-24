import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierEspaceValidator{

    static sansEspace(): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(!c.value.replace(/\s/g, '').length){

                return { 'prenom': false };

            }

            return {'prenom': true};

        };

    }

}