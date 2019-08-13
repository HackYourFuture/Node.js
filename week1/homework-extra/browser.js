function renderGIF() {
  const gifURL = 'https://i.imgur.com/qj0G0H7.gif';
  const createThenAppend = (child, parent, attr = {}) => {
    const element = document.createElement(child);
    Object.keys(attr).forEach(key => {
      key === 'text' ? (element.textContent = attr[key]) : element.setAttribute(key, attr[key]);
    });
    parent.appendChild(element);
    return element;
  };
  const root = createThenAppend('div', document.body, {
    id: 'root',
    style: 'text-align:center; color:red',
  });
  createThenAppend('h1', root, { text: 'welcome to my web page' });
  createThenAppend('img', root, { src: gifURL });
}

window.onload = () => renderGIF();
