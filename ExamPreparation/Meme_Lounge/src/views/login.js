import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { setNavigationBar } from '../app.js';
import { notify } from '../notify.js';

const loginPageTemplate = (onSubmit) => html`
    <section id="login">
        <form @submit=${onSubmit} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="#">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>`;

export async function loginPage(context) {
    context.render(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        if (email.trim()===''||password.trim()=='') {
            return notify('All fields are required!');
        }
        try {
            const result = await login(email, password);
            setNavigationBar();
            context.page.redirect('/all-memes');
        } catch (err) {
            notify(err.message);
        }
     
    }
}