import { html } from '../../node_modules/lit-html/lit-html.js'
import { loginRequest } from '../api.js';
import { setNavigationBar } from '../app.js';
import {setSessionStorage} from '../sessionStorage.js';


const loginPageTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export function showLoginPage(context) {
    context.render(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData=new FormData(event.target);
        const email=formData.get('email');
        const password=formData.get('password');
  
        if (email===''||password==='') {
            return alert('All fields are required!');
        }
      
        const user= await loginRequest(email,password);
        
        setSessionStorage(user);
        setNavigationBar();
        context.page.redirect('/');
    }
}