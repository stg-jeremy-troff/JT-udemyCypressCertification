/// <reference types="Cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about')
        cy.get('[data-cy="contact-input-message"]').type('Hello world!');
        cy.get('[data-cy="contact-input-name"]').type('John Doe');
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.eq(undefined);
            expect(el.text()).to.contain('Send Message');
        });
        cy.screenshot();
        cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
        // cy.get('[data-cy="contact-btn-submit"]')
        // .contains('Send Message')
        // .and('not.have.attr', 'disabled');
        cy.screenshot();
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        // cy.get('@submitBtn').click();
        cy.get('@submitBtn')
        .contains('Sending...')
        .and('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.eq('Sending...');
        });

        cy.get('[data-cy="contact-input-message"]').as('msgInput');
        cy.get('@msgInput').focus().blur();
        cy.get('@msgInput')
        .parent()
        .should('have.attr', 'class')
        .and('match', /invalid/);
        
        cy.get('[data-cy="contact-input-name"]').focus().blur();
        cy.get('[data-cy="contact-input-name"]')
        .parent()
        .should('have.attr', 'class')
        .and('match', /invalid/);

        cy.get('[data-cy="contact-input-email"]').focus().blur();
        cy.get('[data-cy="contact-input-email"]')
        .parent()
        .should((el) => {
            expect(el.attr('class')).to.contains('invalid');
        });
    })
});