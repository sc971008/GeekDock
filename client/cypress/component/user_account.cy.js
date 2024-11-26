import LogIn from '../../src/components/main/login';
import Register from '../../src/components/main/register';

it('mounts', () => {
    cy.mount(<LogIn/>)
    cy.get('#formUserInput')
    cy.get('#formPassInput')
    cy.get('.form_postBtn')
})

it('shows user inputted by user', () => {
    cy.mount(<LogIn/>)
    cy.get('#formUserInput').should('have.value', '')
    cy.get('#formUserInput').type('abc')
    cy.get('#formUserInput').should('have.value', 'abc')
})

it('shows text inputted by user', () => {
    cy.mount(<LogIn/>)
    cy.get('#formPassInput').should('have.value', '')
    cy.get('#formPassInput').type('abc')
    cy.get('#formPassInput').should('have.value', 'abc')
})

it('shows error message when inputs are empty', () => {
    cy.mount(<LogIn/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Username cannot be empty')
    cy.get('div .input_error').contains('Password cannot be empty')

})

it('mounts', () => {
    cy.mount(<Register/>)
    cy.get('#formUserInput')
    cy.get('#formPassInput')
    cy.get('.form_postBtn')
})

it('shows user inputted by user', () => {
    cy.mount(<Register/>)
    cy.get('#formUserInput').should('have.value', '')
    cy.get('#formUserInput').type('abc')
    cy.get('#formUserInput').should('have.value', 'abc')
})

it('shows text inputted by user', () => {
    cy.mount(<Register/>)
    cy.get('#formPassInput').should('have.value', '')
    cy.get('#formPassInput').type('abc')
    cy.get('#formPassInput').should('have.value', 'abc')
})

it('shows error message when inputs are empty', () => {
    cy.mount(<Register/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Username cannot be empty')
    cy.get('div .input_error').contains('Password cannot be empty')

})

