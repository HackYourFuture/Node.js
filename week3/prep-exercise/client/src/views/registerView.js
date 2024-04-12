import getViewIds from '../util/getViewIds.js';
import createModalDialView from './modalDialogView.js';

function createRegisterView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <div class="container">
      <div class="row">
        <div class="col s6 offset-s3 z-depth-1 auth-panel">
          <h5 class="auth-title">Register</h5>
          <form id="registerForm" class="col s12">
            <div class="input-field">
              <input type="text" class="validate" id="username"/>
              <label for="username">Username</label>
            </div>
            <div class="input-field">
              <input type="password" class="validate" id="password"/>
              <label for="password">Password</label>
            </div>
            <input type="submit" class="waves-effect waves-light btn auth-submit-btn" id="register__submit-btn"/>
          </form>
          <div>
            <p>Already registered? 
                <a href="#"
                style="text-decoration: none;" id="loginLink">
                  Login
                </a>
              </p>
          </div>
        </div>
      </div>
    </div>         
  `;

  const modalView = createModalDialView({ title: 'Registration Failed' });
  root.append(modalView.root);

  const dom = getViewIds(root);

  dom.registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    props.onSubmit(dom.username.value, dom.password.value);
  });

  dom.loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    props.onLogin();
  });

  const update = (state) => {
    modalView.update(state);
  };

  return { root, update };
}

export default createRegisterView;
