function createModalDialView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <!-- Modal Structure: https://materializecss.com/modals.html -->
    <div class="modal">
      <div class="modal-content">
        <h4>${props.title}</h4>
        <p id="modal-text"></p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>        
  `;

  const dom = {};
  dom.modalText = root.querySelector('#modal-text');

  const modalElements = root.querySelectorAll('.modal');
  const modalInstances = M.Modal.init(modalElements);

  const update = (state) => {
    if (state.error) {
      dom.modalText.textContent = state.error;
      modalInstances[0].open();
    }
  };

  return { root, update };
}

export default createModalDialView;
