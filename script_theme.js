function setFont(buttonId) {
  const root = document.documentElement;
  let Font;
  switch (buttonId) {
    case 'Uni':
      fontValue = 'Uni';
      topPaddingValue = '0';
      break;
    case 'Win':
      fontValue = 'Win';
      topPaddingValue = '7px';
      break;
  }
  root.style.setProperty('--body-font', fontValue);
  root.style.setProperty('--bt-padding-top', topPaddingValue);
  localStorage.setItem('font', fontValue);
  localStorage.setItem('paddingTop', topPaddingValue);
}
function setBackground(imageNumber) {
  const root = document.documentElement;
  let backgroundImage;
  switch(imageNumber) {
    case 1: backgroundImage = "url('img/bg/bg.gif')"; break;
    case 2: backgroundImage = "url('img/bg/bg2.gif')"; break;
    case 3: backgroundImage = "url('img/bg/bg3.gif')"; break;
    case 4: backgroundImage = "url('img/bg/bg4.jpg')"; break;
    case 5: backgroundImage = "url('img/bg/bg5.jpg')"; break;
    case 6: backgroundImage = "url('img/bg/bg6.jpg')"; break;
    case 7: backgroundImage = "url('img/bg/bg7.jpg')"; break;
    case 8: backgroundImage = "url('img/bg/bg8.jpg')"; break;
    case 9: backgroundImage = "url('img/bg/bg9.jpg')"; break;
    case 10: backgroundImage = "url('img/bg/bg10.jpg')"; break;
    case 11: backgroundImage = "url('img/bg/bg11.jpg')"; break;
    case 12: backgroundImage = "url('img/bg/bg12.jpg')"; break;
    case 13: backgroundImage = "url('img/bg/bg13.jpg')"; break;
    case 14: backgroundImage = "url('img/bg/bg14.jpg')"; break;
    case 15: backgroundImage = "url('img/bg/bg15.gif')"; break;
    case 16: backgroundImage = "url('img/bg/bg16.jpg')"; break;
    case 17: backgroundImage = "url('img/bg/bg17.jpg')"; break;
    case 18: backgroundImage = "url('img/bg/bg18.png')"; break;
    case 19: backgroundImage = "url('img/bg/bg19.gif')"; break;
    default:
      backgroundImage = "url('img/bg/bg.gif')";
  }
    root.style.setProperty('--body-bg-image', backgroundImage);
    localStorage.setItem('backgroundImage', backgroundImage);
}
function setIconHue(buttonId) {
  const root = document.documentElement;
  let hueValue;
  switch (buttonId) {
    case 'yellow':
      hueValue = '0deg';
      break;
    case 'green':
      hueValue = '100deg';
      break;
    case 'turquoise':
      hueValue = '150deg';
      break;
    case 'blue':
      hueValue = '190deg';
      break;
    case 'purple':
      hueValue = '250deg';
      break;
    case 'pink':
      hueValue = '300deg';
      break;
    case 'coral':
      hueValue = '330deg';
      break;
    default:
      console.warn('Unknown hue option');
      return;
  }
  root.style.setProperty('--icon-hue-rotate', hueValue);
  localStorage.setItem('iconHue', hueValue);
}
function setIconSat(buttonId) {
  const root = document.documentElement;
  let satValue;
  switch (buttonId) {
    case 'bnw':
      satValue = '0%';
      break;
    case 'dull':
      satValue = '50%';
      break;
    case 'normal':
      satValue = '100%';
      break;
    case 'neon':
      satValue = '200%';
      break;
    default:
      console.warn('Unknown saturation option');
      return;
  }
  root.style.setProperty('--icon-saturation', satValue);
  localStorage.setItem('iconSat', satValue);
}
function setIconBri(buttonId) {
  const root = document.documentElement;
  let briValue;
  switch (buttonId) {
    case 'bright':
      briValue = '150%';
      break;
    case 'normal':
      briValue = '100%';
      break;
    case 'dark':
      briValue = '70%';
      break;
    case 'darker':
      briValue = '40%';
      break;
    default:
      console.warn('Unknown saturation option');
      return;
  }
  root.style.setProperty('--icon-brightness', briValue);
  localStorage.setItem('iconBri', briValue);
}
function setImageRen(buttonId) {
  const root = document.documentElement;
  let renValue;
  switch (buttonId) {
    case 'pixelated':
      renValue = 'pixelated';
      break;
    case 'smooth':
      renValue = 'crisp-edges';
      break;
    default:
      console.warn('Unknown saturation option');
      return;
  }
  root.style.setProperty('--image-rendering', renValue);
  localStorage.setItem('imageRen', renValue);
}
function setBgSize(buttonId) {
  const root = document.documentElement;
  let sizeValue;
  switch (buttonId) {
    case 'small':
      sizeValue = '150px';
      break;
    case 'medium':
      sizeValue = '300px';
      break;
    case 'big':
      sizeValue = '400px';
      break;
    default:
      console.warn('Unknown size option');
      return;
  }
  root.style.setProperty('--bg-size', sizeValue);
  localStorage.setItem('bgSize', sizeValue);
}
function setVHSswitch(buttonId) {
  const root = document.documentElement;
  let switchValue;
  switch (buttonId) {
    case 'on':
      switchValue = '100vw';
      break;
    case 'off':
      switchValue = '00vw';
      break;
    default:
      console.warn('Unknown size option');
      return;
  }
  root.style.setProperty('--vhs-switch', switchValue);
  localStorage.setItem('switch', switchValue);
}
function loadSettings() {
  const settings = [
    { localStorageKey: 'iconHue', cssVar: '--icon-hue-rotate' },
    { localStorageKey: 'backgroundImage', cssVar: '--body-bg-image' },
    { localStorageKey: 'iconSat', cssVar: '--icon-saturation' },
    { localStorageKey: 'iconBri', cssVar: '--icon-brightness' },
    { localStorageKey: 'imageRen', cssVar: '--image-rendering' },
    { localStorageKey: 'bgSize', cssVar: '--bg-size' },
    { localStorageKey: 'font', cssVar: '--body-font' },
    { localStorageKey: 'paddingTop', cssVar: '--bt-padding-top' },
    { localStorageKey: 'switch', cssVar: '--vhs-switch' }
  ];

  settings.forEach(setting => {
    const savedValue = localStorage.getItem(setting.localStorageKey);
    if (savedValue) {
      document.documentElement.style.setProperty(setting.cssVar, savedValue);
    }
  });
}

// Call loadSettings when the page loads to apply all stored values
window.addEventListener('DOMContentLoaded', loadSettings);