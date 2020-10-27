describe('/auth.login', () => {

    /* Does this before each integration test is executed (?) */
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth');
    });

    it("greets with Login button", () => {
        // makes sure that there exists an object of type "button" that says "Login"
        cy.contains("button", "Login");
    });

    it("requires email", () => {
        // Make sure that there exists a form that contains Login submit (?)
        cy.get("form").contains("Switch to Sign Up").click();
        cy.get("form").contains("button", "Switch to Login");
        // Make sure that it displays something that says "email can't be blank"
    });

    it("requires password", () => {
        cy.get("#email").type("jdelledo@nd.edu{enter}");
        // Make sure that it displays something that says "password can't be blank"
        // cy.get(".error-message").should("contain", "password can't be blank");
    });

    it("requires valid email and password", () => {
        cy.get("#email").type("jdelledo@nd.edu");
        cy.get("#password").type("invalidpassword{enter}");
        // Make sure that it displays something that says "email or password is invalid"
        // cy.get(".error-message").should("contain", "email or password is invalid");
    });

    it("navigates to / on successful login", () => {
        cy.get("#email").type("jdelledo@nd.edu");
        cy.get("#password").type("12345678{enter}");
        cy.hash().should("eq", "");
    });
})