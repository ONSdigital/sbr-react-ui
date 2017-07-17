const fontChange = {
  increaseText() {
    const h1 = document.getElementsByTagName('h1');
    const h3 = document.getElementsByTagName('h3');
    const p = document.getElementsByTagName('p');
    const list = [h1, h3, p];
    list.forEach((element) => {
      for (let j = 0; j < element.length; j += 1) {
        element[j].style.fontSize = '50px';
      }
    });
    document.getElementById('wholePage').style.fontSize = '20px';
  },
  decreaseText() {
    const h1 = document.getElementsByTagName('h1');
    const h3 = document.getElementsByTagName('h3');
    const p = document.getElementsByTagName('p');
    const list = [h1, h3, p];
    list.forEach((element) => {
      for (let j = 0; j < element.length; j += 1) {
        element[j].style.fontSize = '12px';
      }
    });
    document.getElementById('wholePage').style.fontSize = '10px';
  },
  textDefault() {
    location.reload();
  },
  darkMode() {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    let css = '';
    if (document.body.style.backgroundColor === 'white' || document.body.style.backgroundColor === '') {
      document.body.style.backgroundColor = 'black';
      css = 'html {-webkit-filter: invert(100%);' +
      '-moz-filter: invert(100%);' +
      '-o-filter: invert(100%);' +
      '-ms-filter: invert(100%); }';
    } else {
      document.body.style.backgroundColor = 'white';
      css = 'html {-webkit-filter: invert(0%);' +
      '-moz-filter: invert(0%);' +
      '-o-filter: invert(0%);' +
      '-ms-filter: invert(0%); }';
    }
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    // injecting the css to the head
    head.appendChild(style);
  },
};

module.exports = fontChange;
