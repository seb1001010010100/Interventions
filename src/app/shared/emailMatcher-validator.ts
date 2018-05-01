import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {

    static courrielConfirmation(): ValidatorFn {

        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let courriel = c.get('courriel');
            let courrielConfirmation = c.get('courrielConfirmation');
            if (!courriel.value || !courrielConfirmation.value) {

                return null;

            }

            return courriel.value === courrielConfirmation.value ? null : { 'courrielConfirmation': true };
            
        };
    }
} 