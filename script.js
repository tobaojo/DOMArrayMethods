const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillion = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calWealth = document.getElementById('calculate-wealth');


let data = [];

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

function doubleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    });
    
    updateDom();
}

function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updateDom();
}


function filterMillionaires(){
     data =  data.filter((user)  => {
        return user.money > 1000000;
    })

    updateDom();
}
//add data to function array
function addData(obj){
    data.push(obj);

    updateDom()
}

//double eveyone money


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