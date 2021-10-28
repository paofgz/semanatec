describe('Visit Home screen', () => {
    it('successfully loads and writes in the name field', () => {
      cy.visit('/')
        cy.get('#nombre').type("Paola")
        cy.get('#apellido').type("Fernandez")
        cy.get('#botonAgregar').click()
        cy.get('#titulo').should('have.value', 'Hola Paola Fernandez, presionaste 1 veces el botón')
    })
  })