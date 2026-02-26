import {
  getAppTitle,
  getThemeToggle,
  getResetButton,
  getExpandToggle,
  getHabitNameInput,
  getAddButton,
  getColorOptions,
  getHabitCards,
  getHabitCard,
  getEmptyState,
  getSearchInput,
  getFilterSelect,
  getSortSelect,
  getEditModal,
  getDeleteModal,
  getHeaderStats,
} from '../support/app.po';

describe('Habit Tracker E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  // ──────────────────────────────────────────────
  // 1. Initial Load
  // ──────────────────────────────────────────────
  describe('Initial Load', () => {
    it('should display the app title', () => {
      getAppTitle().should('contain.text', 'Habit Tracker');
    });

    it('should show 0/0 habits in header stats', () => {
      getHeaderStats().should('contain.text', '0/0');
    });

    it('should display the empty state message', () => {
      getEmptyState().should('be.visible');
      getEmptyState().should('contain.text', 'No habits found');
    });

    it('should have the add habit section collapsed', () => {
      cy.get('#habit-name').should('not.exist');
    });
  });

  // ──────────────────────────────────────────────
  // 2. Create a Habit - Full Flow
  // ──────────────────────────────────────────────
  describe('Create Habit', () => {
    it('should expand the form on toggle click', () => {
      getExpandToggle().click();
      getHabitNameInput().should('be.visible');
      getAddButton().should('be.visible');
    });

    it('should create a new habit and display it', () => {
      getExpandToggle().click();
      getHabitNameInput().type('Morning Exercise');
      getAddButton().click();

      getHabitCards().should('have.length', 1);
      getHabitCard('Morning Exercise').should('be.visible');
      getEmptyState().should('not.exist');
    });

    it('should update header stats after creating a habit', () => {
      getExpandToggle().click();
      getHabitNameInput().type('Read');
      getAddButton().click();

      getHeaderStats().should('contain.text', '0/1');
    });

    it('should select a color for the habit', () => {
      getExpandToggle().click();
      getColorOptions().eq(2).click();
      getColorOptions().eq(2).should('have.class', 'selected');
      getHabitNameInput().type('Colored Habit');
      getAddButton().click();

      getHabitCards().should('have.length', 1);
    });

    it('should create multiple habits', () => {
      const habits = ['Exercise', 'Read', 'Meditate'];
      habits.forEach((name) => {
        getExpandToggle().click();
        getHabitNameInput().type(name);
        getAddButton().click();
      });

      getHabitCards().should('have.length', 3);
    });
  });

  // ──────────────────────────────────────────────
  // 3. Toggle Days - Progress Tracking
  // ──────────────────────────────────────────────
  describe('Day Toggle & Progress', () => {
    beforeEach(() => {
      getExpandToggle().click();
      getHabitNameInput().type('Test Habit');
      getAddButton().click();
    });

    it('should toggle a day checkbox', () => {
      getHabitCard('Test Habit').find('.day-checkbox').first().click();
      getHabitCard('Test Habit')
        .find('.day-checkbox')
        .first()
        .should('have.class', 'checked');
    });

    it('should update completion text after checking days', () => {
      getHabitCard('Test Habit').find('.day-checkbox').eq(0).click();
      getHabitCard('Test Habit').find('.day-checkbox').eq(1).click();

      getHabitCard('Test Habit')
        .find('.completion-text')
        .should('contain.text', '2/7');
    });

    it('should show progress bar updating', () => {
      getHabitCard('Test Habit').find('.day-checkbox').eq(0).click();
      getHabitCard('Test Habit')
        .find('[role="progressbar"]')
        .should('have.attr', 'aria-valuenow', '14');
    });

    it('should show completion badge when all days checked', () => {
      for (let i = 0; i < 7; i++) {
        getHabitCard('Test Habit').find('.day-checkbox').eq(i).click();
      }

      getHabitCard('Test Habit')
        .find('.completion-badge')
        .should('be.visible');
    });

    it('should update header stats when habit is completed', () => {
      for (let i = 0; i < 7; i++) {
        getHabitCard('Test Habit').find('.day-checkbox').eq(i).click();
      }

      getHeaderStats().should('contain.text', '1/1');
    });

    it('should uncheck a day on second click', () => {
      getHabitCard('Test Habit').find('.day-checkbox').first().click();
      getHabitCard('Test Habit').find('.day-checkbox').first().click();
      getHabitCard('Test Habit')
        .find('.day-checkbox')
        .first()
        .should('not.have.class', 'checked');
    });
  });

  // ──────────────────────────────────────────────
  // 4. Edit Habit
  // ──────────────────────────────────────────────
  describe('Edit Habit', () => {
    beforeEach(() => {
      getExpandToggle().click();
      getHabitNameInput().type('Old Name');
      getAddButton().click();
    });

    it('should open the edit modal', () => {
      getHabitCard('Old Name').contains('button', 'Edit').click();
      getEditModal().should('be.visible');
      getEditModal().should('contain.text', 'Edit Habit');
    });

    it('should update the habit name', () => {
      getHabitCard('Old Name').contains('button', 'Edit').click();
      cy.get('#edit-habit-name').clear().type('New Name');
      cy.contains('button', 'Save Changes').click();

      getHabitCard('New Name').should('be.visible');
      cy.get('.habit-card').should('not.contain.text', 'Old Name');
    });

    it('should close modal on Cancel', () => {
      getHabitCard('Old Name').contains('button', 'Edit').click();
      cy.contains('button', 'Cancel').click();
      getEditModal().should('not.exist');
    });

    it('should close modal on Escape', () => {
      getHabitCard('Old Name').contains('button', 'Edit').click();
      cy.get('body').type('{esc}');
      getEditModal().should('not.exist');
    });
  });

  // ──────────────────────────────────────────────
  // 5. Delete Habit
  // ──────────────────────────────────────────────
  describe('Delete Habit', () => {
    beforeEach(() => {
      getExpandToggle().click();
      getHabitNameInput().type('To Delete');
      getAddButton().click();
    });

    it('should open delete confirmation modal', () => {
      getHabitCard('To Delete').contains('button', 'Delete').click();
      getDeleteModal().should('be.visible');
      getDeleteModal().should('contain.text', 'Are you sure');
    });

    it('should delete the habit on confirm', () => {
      getHabitCard('To Delete').contains('button', 'Delete').click();
      getDeleteModal().contains('button', 'Delete').click();

      getHabitCards().should('have.length', 0);
      getEmptyState().should('be.visible');
    });

    it('should cancel deletion', () => {
      getHabitCard('To Delete').contains('button', 'Delete').click();
      getDeleteModal().contains('button', 'Cancel').click();

      getDeleteModal().should('not.exist');
      getHabitCard('To Delete').should('be.visible');
    });
  });

  // ──────────────────────────────────────────────
  // 6. Filter & Search
  // ──────────────────────────────────────────────
  describe('Filter & Search', () => {
    beforeEach(() => {
      // Create 2 habits
      ['Exercise', 'Reading'].forEach((name) => {
        getExpandToggle().click();
        getHabitNameInput().type(name);
        getAddButton().click();
      });

      // Complete all days for "Exercise"
      for (let i = 0; i < 7; i++) {
        getHabitCard('Exercise').find('.day-checkbox').eq(i).click();
      }
    });

    it('should filter completed habits', () => {
      getFilterSelect().select('completed');
      getHabitCards().should('have.length', 1);
      getHabitCard('Exercise').should('be.visible');
    });

    it('should filter incomplete habits', () => {
      getFilterSelect().select('incomplete');
      getHabitCards().should('have.length', 1);
      getHabitCard('Reading').should('be.visible');
    });

    it('should search habits by name', () => {
      getSearchInput().type('Exer');
      getHabitCards().should('have.length', 1);
      getHabitCard('Exercise').should('be.visible');
    });

    it('should show no results for non-matching search', () => {
      getSearchInput().type('zzzzz');
      getEmptyState().should('be.visible');
    });

    it('should sort habits by name', () => {
      getSortSelect().select('name');
      getHabitCards().first().should('contain.text', 'Exercise');
    });
  });

  // ──────────────────────────────────────────────
  // 7. Theme Toggle
  // ──────────────────────────────────────────────
  describe('Theme', () => {
    it('should toggle to dark mode', () => {
      getThemeToggle().click();
      cy.get('html').should('have.attr', 'data-theme', 'dark');
    });

    it('should toggle back to light mode', () => {
      getThemeToggle().click();
      getThemeToggle().click();
      cy.get('html').should('not.have.attr', 'data-theme', 'dark');
    });

    it('should persist theme in localStorage', () => {
      getThemeToggle().click();
      cy.reload();
      cy.get('html').should('have.attr', 'data-theme', 'dark');
    });
  });

  // ──────────────────────────────────────────────
  // 8. Reset Progress
  // ──────────────────────────────────────────────
  describe('Reset Progress', () => {
    it('should be disabled when no habits exist', () => {
      getResetButton().should('be.disabled');
    });

    it('should reset all progress', () => {
      getExpandToggle().click();
      getHabitNameInput().type('Reset Test');
      getAddButton().click();

      // Check some days
      getHabitCard('Reset Test').find('.day-checkbox').eq(0).click();
      getHabitCard('Reset Test').find('.day-checkbox').eq(1).click();
      getHabitCard('Reset Test')
        .find('.completion-text')
        .should('contain.text', '2/7');

      getResetButton().click();

      getHabitCard('Reset Test')
        .find('.completion-text')
        .should('contain.text', '0/7');
    });
  });

  // ──────────────────────────────────────────────
  // 9. Persistence (localStorage)
  // ──────────────────────────────────────────────
  describe('Persistence', () => {
    it('should persist habits across page reloads', () => {
      getExpandToggle().click();
      getHabitNameInput().type('Persisted Habit');
      getAddButton().click();

      cy.reload();

      getHabitCard('Persisted Habit').should('be.visible');
    });

    it('should persist day progress across page reloads', () => {
      getExpandToggle().click();
      getHabitNameInput().type('Day Persist');
      getAddButton().click();

      getHabitCard('Day Persist').find('.day-checkbox').eq(0).click();
      cy.reload();

      getHabitCard('Day Persist')
        .find('.day-checkbox')
        .first()
        .should('have.class', 'checked');
    });
  });

  // ──────────────────────────────────────────────
  // 10. Accessibility
  // ──────────────────────────────────────────────
  describe('Accessibility', () => {
    it('should have proper ARIA roles', () => {
      cy.get('[role="banner"]').should('exist');
      cy.get('[role="toolbar"]').should('exist');
    });

    it('should have skip link for keyboard navigation', () => {
      cy.get('.skip-link').should('exist');
    });

    it('should have aria-pressed on day checkboxes', () => {
      getExpandToggle().click();
      getHabitNameInput().type('A11y Test');
      getAddButton().click();

      getHabitCard('A11y Test')
        .find('[role="switch"]')
        .first()
        .should('have.attr', 'aria-pressed', 'false');

      getHabitCard('A11y Test')
        .find('[role="switch"]')
        .first()
        .click();

      getHabitCard('A11y Test')
        .find('[role="switch"]')
        .first()
        .should('have.attr', 'aria-pressed', 'true');
    });

    it('should have aria-label on theme toggle', () => {
      getThemeToggle().should('have.attr', 'aria-label');
    });
  });
});
