const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showMillion = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calWealth = document.getElementById('calculate-wealth');


let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

//fetch randomuser and add money

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    console.log(data);
}