'use strict';

{
  function createAndAppend(parent, element, props = {}) {
    const child = Object.assign(document.createElement(element), props);
    parent.appendChild(child);
    return child;
  }

  createAndAppend(document.body, 'img', { src: './image.gif' });
}
