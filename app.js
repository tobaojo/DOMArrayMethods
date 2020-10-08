//add elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user')
const doubleMoneyBtn = document.getElementById('double-money')
const showMillBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calWealth = document.getElementById('calculate-wealth')
//initialise empty array
let data = [];

//call random user method X3
getRandomUser();
getRandomUser();
getRandomUser();
//fetch random user from API and add money property using async
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    //create new user obj from user object 
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj){
    data.push(obj);

    updateDom();
}
//update dom function
function updateDom(provData = data){
    //clear main div
    main.innerHTML = `<h2><strong>Person </strong>wealth</h2>`
    provData.forEach( item => {
        const element = document.createElement('div');
            element.classList.add('person');
            element.innerHTML = `<strong>${item.name}</strong>${item.money}`
            main.appendChild(element)
    })
}
//function to add new user

function addUser(){
    getRandomUser();
}
//function to double money
function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })

    updateDom();
}

//function tosort by richest

function sortByRichest(){
    data.sort((a,b)=>{
       return b.money - a.money ;
    });

updateDom();
}
//function to filter by largest

function showMiilionaires(){
    data = data.filter((mill)=>{
      return mill.money > 1000000
    });

    updateDom();
}
//function to calculate total wealth
// data from object to empty array


//format numebrs to currency

//add  event listeners
addUserBtn.addEventListener('click', addUser)
doubleMoneyBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillBtn.addEventListener('click',showMiilionaires)