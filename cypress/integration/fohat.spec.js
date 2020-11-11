const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const LOCAL_STORAGE_STATE_KEY = 'state';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';

const name = 'Some name';
const email = 'email@email.com';

const TOKEN_KEY = 'token';

describe('[Login Page] - Check if page render and user was able to fill fields', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });

  it('Write user name', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Some name')
  });

  it('Write user email', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@email.com');
  });

  it('Play button diseabled if none of the fields are filled', () => {
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });
  it('Play button diseabled if only name are filled', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('João do É');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Play button diseabled if only email are filled', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@protonmail.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Play button enable if both fields are filled', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Jhon Wick');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('matrix@email.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('not.be.disabled');
  });
});

describe('[Login Page] Verify Play button function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
  });

  it('Save player token before game starts', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Some name');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@email.com');
    cy.get(BUTTON_PLAY_SELECTOR).click().should(() => {
      expect(localStorage.getItem(TOKEN_KEY)).not.to.be.null;
    });
  });
});

describe('[Header] Check if Header render, check if load player info', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_NAME_SELECTOR);
  });

  it('Gravatar Player´s show in header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('Player´s name show in header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('Player´s score was 0, and present header', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});