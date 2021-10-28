describe('Visit Home screen', () => {
    it('successfully loads and writes in the name field', () => {
      cy.visit('/')
        cy.get('#nombre').type("Andres")
        cy.get('#apellido').type("Torres")
        cy.get('#botonAgregar').click()
    })
  })