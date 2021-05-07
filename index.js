'use strict';

console.log('jedu');

// let hraje = 'kolecko';

// const kliknuto = (e) => {
//   e.target.classList.add(`ctverec__${hraje}`);
//   console.log('jedu furt');
//   e.target.disabled = 'true';
//   if (hraje === 'kolecko') {
//     hraje = 'krizek';
//     e.target.classList.add('.cross');
//     const symbolBig = (document.querySelector('.symbol__big').src =
//       'Obrazky2/cross.svg');

//     console.log('jedu blbě ale přece');
//   } else {
//     hraje = 'kolecko';
//     const symbolBig = (document.querySelector('.symbol__big').src =
//       'Obrazky2/circle.svg');
//   }
// };

// const buttonElm = document.querySelectorAll('.ctverec');
// for (let i = 0; i < buttonElm.length; i++) {
//   buttonElm[i].addEventListener('click', kliknuto);
// }

// /* ------funkce, která vrátí souřadnice políčka---------- */
// Napiš funkci getPosition(field), která pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, …
const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.ctverec'); // Selektor pozměň tak, aby odpovídal tvému kódu.

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
console.log(getPosition(fields[59]));

// Napiš funkci getField(row, column), která naopak pro číslo řádku a sloupce vrátí příslušný prvek.
const getField = (row, column) => fields[row * boardSize + column];
console.log(getField(9, 3));

// Přichystej si funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined
const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('ctverec__krizek')) {
    return 'cross';
  } else if (field.classList.contains('ctverec__kolecko')) {
    return 'circle';
  }
};

// Vytvoř funkci isWinningMove(field), která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false.

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
// Funkci isWinningMove pusť s každým nově přidaným symbolem.

// Pokud vrátí true, zobraz alert s hláškou, který hráč vyhrál.

let hraje = 'kolecko';

const kliknuto = (e) => {
  e.target.classList.add(`ctverec__${hraje}`);
  console.log('jedu furt');
  e.target.disabled = 'true';

  const vyhra = isWinningMove(e.target);
  if (vyhra === true && hraje === 'kolecko') {
    setTimeout(() => {
      let msg = confirm(`Vyhrálo kolečko. Hraješ znovu?`);
      if (msg === true) {
        location.reload();
      }
    }, 200);
  } else if (vyhra === true && hraje === 'krizek') {
    setTimeout(() => {
      let msg = confirm(`Vyhrál křížek. Hraješ znovu?`);
      if (msg === true) {
        location.reload();
      }
    }, 200);
  }

  if (hraje === 'kolecko') {
    hraje = 'krizek';
    e.target.classList.add('.cross');
    const symbolBig = (document.querySelector('.symbol__big').src =
      'Obrazky2/cross.svg');
  } else {
    hraje = 'kolecko';
    const symbolBig = (document.querySelector('.symbol__big').src =
      'Obrazky2/circle.svg');
  }
};

const buttons = document.querySelectorAll('.ctverec');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', kliknuto);
}
