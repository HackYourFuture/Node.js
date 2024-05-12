import getViewIds from '../util/getViewIds.js';

function createRegisterSuccessView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <div class="row">
      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <nav>
          <div class="nav-wrapper">
            <div class="col s12">
              <a href="#" class="brand-logo">HYF Node.js</a>
              <a href="#" data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><a href="#" id="loginBtn">Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <ul class="sidenav" id="mobile">
          <li><a href="#" id="mobileLoginBtn">Login</a></li>
        </ul>
      </div>

      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <h5>Registration was successful!</h5>
        <p>You can now login with your username and password.</p>
      </div>
    </div>
  `;

  const dom = getViewIds(root);

  const sideNavElements = root.querySelectorAll('.sidenav');
  const sideNavInstances = M.Sidenav.init(sideNavElements);

  const loginHandler = (event) => {
    event.preventDefault();
    sideNavInstances[0].close();
    props.onLogin();
  };

  dom.loginBtn.addEventListener('click', loginHandler);
  dom.mobileLoginBtn.addEventListener('click', loginHandler);

  return { root };
}

export default createRegisterSuccessView;
