import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierEspaceValidator{

    static sansEspace(): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(!c.value.replace(/\s/g, '').length){

                return { 'sansespace': false };

            }

            return null;

        };

    }

    static longueurMinimum(min: number): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(c.value.replace(/\s/g, '').length >= min){

                return null;

            }

            return {'longeurMinimum': false};

        };

    }

    static longueurMaximum(max: number): ValidatorFn{

        return(c: AbstractControl): {[key: string]: boolean} | null => {

            if(c.value.replace(/\s/g, '').length < max && c.value.replace(/\s/g, '').length > 0){

                return null;

            }

            return {'longueurMaximum': false};

        };

    }
}