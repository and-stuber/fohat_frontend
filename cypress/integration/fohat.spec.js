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
