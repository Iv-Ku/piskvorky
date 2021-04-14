'use strict';


console.log('jedu');

let hraje = 'kolecko';

const kliknuto = (e) => {
  e.target.classList.add(`ctverec__${hraje}`);
  console.log('jedu furt');
  e.target.disabled = 'true';
  if (hraje === 'kolecko') {
    hraje = 'krizek';
      e.target.classList.add('.cross');
      const symbolBig = (document.querySelector('.symbol__big').src =
      'Obrazky2/cross.svg');
    
    console.log('jedu blbě ale přece');
  } else {
    hraje = 'kolecko';
    const symbolBig = (document.querySelector('.symbol__big').src =
      'Obrazky2/circle.svg');
  }
};

const buttonElm = document.querySelectorAll('.ctverec');
for (let i = 0; i < buttonElm.length; i++) {
  buttonElm[i].addEventListener('click', kliknuto);
}
