import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenom')).clear();
    element(by.id('nom')).clear();
    element(by.id('descriptionProblemeId')).clear();

    element(by.id('prenom')).sendKeys('tonprenom');
    element(by.id('nom')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('choixId')).get(0).click();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   bouttonSubmit() : ElementFinder{

    return element(by.buttonText('Sauvegarder'));

   }

   setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenom')).clear();
    element(by.id('nom')).clear();
    element(by.id('descriptionProblemeId')).clear();

    element(by.id('prenom')).sendKeys('tonprenom');
    element(by.id('nom')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('choixId')).get(2).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenom')).clear();
    element(by.id('nom')).clear();
    element(by.id('descriptionProblemeId')).clear();

    element(by.id('prenom')).sendKeys('tonprenom');
    element(by.id('nom')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noTypeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('choixId')).get(1).click();
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('courrielConfirmationId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 
   
   setZoneDescriptionProblemeCaracteresSuffisants() : void{

    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('x'.repeat(5));

   }

   setZoneDescriptionProblemeCaracteresInsuffisants() : void{

    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('x'.repeat(4));

   }

   obtenirClasseDescriptionProbleme(){

    return element(by.id('descriptionProblemeId')).getAttribute("class");

   }


}
