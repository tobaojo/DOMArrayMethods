//get elements from HTML 
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillion = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calWealth = document.getElementById('calculate-wealth');

//initialise empty array
let data = [];

//call getRandomUser method X3 times
getRandomUser()
getRandomUser()
getRandomUser()

//fetch randomuser and add money

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser ={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);

}
// function to double the money
function doubleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    });
    
    updateDom();
}
// function to sort by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updateDom();
}

// funtion to filter millionaires
function filterMillionaires(){
     data =  data.filter((user)  => {
        return user.money > 1000000;
    })

    updateDom();
}
//Function calculateTotalWealth 
function calculateTotalWealth(){
    const wealth  = data.reduce((acc, user)  => 
        (acc += user.money), 0)

   console.log(formatMoney(wealth));

  const wealthEl  = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}
//add data to function array
function addData(obj){
    data.push(obj);

    updateDom()
}



//update dom

function updateDom(provData = data){
    //clear main div
    main.innerHTML = `<h2><strong>Person </strong>wealth</h2>`
    provData.forEach( item => {
        const element = document.createElement('div');
            element.classList.add('person');
            element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
            main.appendChild(element)
    })
}

//format number as money 

function formatMoney(number){
    return '£'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//event Listener
addUser.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest)
showMillion.addEventListener('click', filterMillionaires)
calWealth.addEventListener('click',calculateTotalWealth)