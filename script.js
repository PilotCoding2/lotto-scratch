const randomItems = ['🍒', '🍎', '🍉', '🍊', '🍓', '🥝', '🍌'];

const winCount = document.querySelector('.win-count');
const newTicketBtn = document.querySelector('.new-ticket');
const lottoSquares = document.querySelectorAll('.lotto-square');
const lottoRandomItems = document.querySelectorAll('.lotto-random-item');
let money = 0;

const randomSelector = () => {
    let selector = Math.floor(randomItems.length * Math.random());
    return selector;
}

const randomLottoItemsGenerator = () => {
    let generatedItems = [];
    for(let i = 0; i < 9; i++){
        let selector = randomSelector();
        generatedItems.push(randomItems[selector]);
    }
    return generatedItems;
}

let randomFruits = randomLottoItemsGenerator();

const appendRandomItems = (randomFruits) => {
    lottoRandomItems.forEach((item, index) => {
        item.textContent = randomFruits[index];
    });
}

const showRandomItems = () => {
    event.target.style.backgroundColor = 'transparent';
    event.target.firstElementChild.style.display = 'block';
}

const hideRandomItems = () => {
    lottoSquares.forEach(square => {
        square.style.backgroundColor = '#c0a060';
    });
    lottoRandomItems.forEach(item => {
        item.style.display = 'none';
    });
}

const randomItemHiddenChecker = () => {
    let randomItemList = [...lottoRandomItems];
    console.log([...lottoRandomItems].map(item => item.style.display));
    if(randomItemList.every(random => random.style.display === 'block')){
        return true;
    } else {
        return false;
    }
}

const winnerChecker = (randomFruits) => {
    const count = randomFruits.reduce((accum, curr) => {
        accum[curr] = (accum[curr] || 0) + 1;
        return accum;
    }, {});
    if(Object.values(count).some(fruit => fruit >= 3)){
        money += 3;
        winCount.textContent = `$${money}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    randomFruits = randomLottoItemsGenerator();
    appendRandomItems(randomFruits);
})

newTicketBtn.addEventListener("click", () => {
    if(randomItemHiddenChecker() === false){
        return;
    }
    randomFruits = randomLottoItemsGenerator();
    hideRandomItems();
    appendRandomItems(randomFruits);
});


lottoSquares.forEach(square => {
    square.addEventListener("click", () => {
        showRandomItems();
        if(randomItemHiddenChecker() === true){
            winnerChecker(randomFruits);
        } else {
            return;
        }
    })
})


