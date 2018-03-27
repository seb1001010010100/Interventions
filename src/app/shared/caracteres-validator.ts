import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierEspaceValidator{

    static sansEspace(): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(!c.value.replace(/\s/g, '').length){

                return { 'sansespace': false };

            }

            return {'sansespace': true};

        };

    }

    static longueurMinimum(min: number): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(c.value.replace(/\s/g, '').length >= min){

                return { 'longeurMinimum': true };

            }

            return {'longeurMinimum': false};

        };

    }

}