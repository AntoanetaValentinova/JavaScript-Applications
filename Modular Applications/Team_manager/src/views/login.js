import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js';
import { setNavigationBar } from '../app.js';


const loginPageTemplate = (onSubmit, errorMessage) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${onSubmit}id="login-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : html``}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;

export async function loginPage(context) {
    context.render(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        //get form data
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');


        try {
            const result = await login(email, password);
        } catch (err) {
            //render page again if any of input fields are incorrect
            context.render(loginPageTemplate(onSubmit, err.message));
            throw err;
        }
        //if login was successful set navigation bar and redirect to my teams page
        setNavigationBar();
        context.page.redirect('/my-teams');
    }
}