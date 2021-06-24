
import { html } from '../../node_modules/lit-html/lit-html.js'
import { registerRequest } from '../api.js';
import { setNavigationBar } from '../app.js';
import {setSessionStorage} from '../sessionStorage.js';



const registerPageTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export async function showRegisterPage(context) {
    context.render(registerPageTemplate(onSubmit));
    
    async function onSubmit(event) {
        event.preventDefault();
        const formData=new FormData(event.target);
        const email=formData.get('email');
        const password=formData.get('password');
        const rePass=formData.get('rePass');
        if (email===''||password===''||rePass==='') {
            return alert('All fields are required!');
        }
        if (password!==rePass) {
            return alert('Passwords dont match!');
        }
        const user= await registerRequest(email,password);
     
        setSessionStorage(user);
        setNavigationBar();
        context.page.redirect('/');
    }
}