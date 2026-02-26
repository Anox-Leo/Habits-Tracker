// Page Object helpers for Habit Tracker E2E tests

export const getHeader = () => cy.get('[role="banner"]');
export const getAppTitle = () => cy.get('.app-title');
export const getHeaderStats = () => cy.get('.header-stats');
export const getThemeToggle = () => cy.get('.theme-toggle');
export const getResetButton = () => cy.contains('button', 'Reset Progress');

// Add Habit Form
export const getExpandToggle = () => cy.get('.expand-toggle');
export const getHabitNameInput = () => cy.get('#habit-name');
export const getAddButton = () => cy.contains('button', 'Add Habit');
export const getColorOptions = () => cy.get('.color-option');

// Habits List
export const getHabitCards = () => cy.get('.habit-card');
export const getHabitCard = (name: string) =>
  cy.get('.habit-card').contains('.habit-name', name).closest('.habit-card');
export const getEmptyState = () => cy.get('.empty-state');

// Filter & Search
export const getSearchInput = () => cy.get('#search-habits');
export const getFilterSelect = () => cy.get('#filter-select');
export const getSortSelect = () => cy.get('#sort-select');

// Day Checkboxes
export const getDayCheckboxes = (card: Cypress.Chainable) =>
  card.find('.day-checkbox');

// Modal
export const getEditModal = () => cy.get('[role="dialog"]');
export const getDeleteModal = () => cy.get('[role="alertdialog"]');
export const getModalClose = () => cy.get('.modal-close');
