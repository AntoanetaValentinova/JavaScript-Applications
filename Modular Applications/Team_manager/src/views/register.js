import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js';
import { setNavigationBar } from '../app.js';


const registerPageTemplate = (onSubmit, errorMessage) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${errorMessage ? html`<div class="error">${errorMessage}</div>` : html``}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;

export async function registerPage(context) {
    context.render(registerPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        //get form data
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repass');

        let errorMessage = '';
        //validations
        if (email === '') {
            errorMessage = 'Email input is required';
        } else if (username === '' || username.length < 2) {
            errorMessage = 'Username must be at least 3 characters!';
        } else if (password === '' || password.length < 2) {
            errorMessage = 'Password must be at least 3 characters!';
        } else if (password !== repass) {
            errorMessage = 'Passwords dont match!';
        }

        //render page again if any of input fields are incorrect
        if (errorMessage !== '') {
            context.render(registerPageTemplate(onSubmit, errorMessage));
        } else {
            try {
                const result = await register(email, username, password);
            } catch (err) {
                //render page again if any of input fields are incorrect
                errorMessage = err.message;
                context.render(registerPageTemplate(onSubmit, errorMessage));
                throw err;
            }
            //if register was successful set navigation bar and redirect to my teams page
            setNavigationBar();
            context.page.redirect('/my-teams');
        }
    }
}