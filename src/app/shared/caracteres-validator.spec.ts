import { VerifierEspaceValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {

    it('une chaîne vide est invalide', () =>{

        let control = {value: ""};
        let validator = VerifierEspaceValidator.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansespace']).toBe(false);

    });

    it('une chaîne avec 10 espaces est invalide', () =>{

        let control = {value: " ".repeat(10)};
        let validator = VerifierEspaceValidator.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansespace']).toBe(false);

    });

    it('une phrase avec des mots est valide', () =>{

        let control = {value: "CeciEstUnTest"};
        let validator = VerifierEspaceValidator.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansespace']).toBe(true);

    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{

        let control = {value: " ".repeat(3) + "CeciEstUnTest" + " ".repeat(3) };
        let validator = VerifierEspaceValidator.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansespace']).toBe(true);

    });

});

describe('longueurMinimum Validator', () => {

    it('une expression avec 1 espace et 2 caractère est invalide', () =>{

        let control = {value: " ".repeat(1) + "a".repeat(2) };
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longeurMinimum']).toBe(false);

    });

    it('une expression avec 2 espaces et 1 caractère est invalide', () =>{

        let control = {value: " ".repeat(2) + "a".repeat(1) };
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longeurMinimum']).toBe(false);

    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () =>{

        let control = {value: " ".repeat(3) + "a".repeat(3) };
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longeurMinimum']).toBe(true);

    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () =>{

        let control = {value: " ".repeat(5) + "a".repeat(5) };
        let validator = VerifierEspaceValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longeurMinimum']).toBe(true);

    });

});