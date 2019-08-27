/* eslint-disable no-undef */
/* eslint-disable strict */
const Window = require('window');

const window = new Window();

const img = document.createElement('img');
img.src = './public/image.gif';
const root = document.getElementById('root');
root.appendChild(img);

window.onload = () => appendImg();
