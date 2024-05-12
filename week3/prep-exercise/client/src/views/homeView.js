import getViewIds from '../util/getViewIds.js';
import createModalDialView from './modalDialogView.js';

function createHomeView(props) {
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
                <li><a href="#" id="logoutBtn">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <ul class="sidenav" id="mobile">
          <li><a href="#" id="mobileLogoutBtn">Logout</a></li>
        </ul>
        <p id="profile"></p>
      </div>
    </div>
  `;

  const modalView = createModalDialView({ title: 'Error' });
  root.append(modalView.root);

  const dom = getViewIds(root);

  const sideNavElements = root.querySelectorAll('.sidenav');
  const sideNavInstances = M.Sidenav.init(sideNavElements);

  const logoutHandler = (event) => {
    event.preventDefault();
    sideNavInstances[0].close();
    props.onLogout();
  };

  dom.logoutBtn.addEventListener('click', logoutHandler);
  dom.mobileLogoutBtn.addEventListener('click', logoutHandler);

  const update = (state) => {
    dom.profile.textContent = state.profile;
    modalView.update(state);
  };

  return { root, update };
}

export default createHomeView;
