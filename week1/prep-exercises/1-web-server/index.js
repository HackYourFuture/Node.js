// index.js

function manipulateDOM(document) {
    const contentElement = document.getElementById('content');
    contentElement.textContent = 'Welcome to Server-land!';
}

module.exports = manipulateDOM;
