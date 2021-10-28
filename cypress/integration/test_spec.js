describe('Visit Home screen', () => {
    it('successfully loads and writes in the name field', () => {
      cy.visit('/')
        let titulo
        cy.get('#nombre').type("Paola")
        cy.get('#apellido').type("Fernandez")
        cy.get('#botonAgregar').click()
        cy.get('#titulo').should(($h2) => {
            titulo = $h2.text();
            expect(titulo).equal("Hola Paola Fernandez, presionaste 1 veces el botón");
        });
    })
  })