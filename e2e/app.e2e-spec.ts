import { AppPage } from './app.po';

describe('interventions App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
  
    page.setChampsValidesScenarioNominal();
    expect(page.bouttonSubmit().isEnabled()).toBeTruthy();

  });
  
  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
  
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.bouttonSubmit().isEnabled()).toBeTruthy();

  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par courriel', () => {
  
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.bouttonSubmit().isEnabled()).toBeTruthy();

  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
  
    page.setZoneDescriptionProblemeCaracteresSuffisants();
    expect(page.obtenirClasseDescriptionProbleme()).toContain('is-valid');

  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant ', () => {
  
    page.setZoneDescriptionProblemeCaracteresInsuffisants();
    expect(page.obtenirClasseDescriptionProbleme()).toContain('is-invalid');

  });

  
});
