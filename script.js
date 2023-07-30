// get total
// create product 
// save localstorage
// clear inputs
// read
// delete
// count
// update
// search
// clean data


let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let category = document.querySelector('#category');
let count = document.querySelector('#count');
let submit = document.querySelector('#submit');

// get total
function getTotal(){
if (price.value !=""){
    let result = +price.value+ +taxes.value + +ads.value - +discount.value
    total.innerHTML = result;
    total.style.backgroundColor = '#040'
}else {
    total.innerHTML = '';
    total.style.backgroundColor = '#b10505'
}
}

// create product 
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)  
}else {
    dataPro = [];
}

submit.onclick = function(){
    let newPro= {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    dataPro.push(newPro);
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}

// clear inputs
function clearData(){
title.value = '';
price.value = '';
ads.value = '';
taxes.value = '';
discount.value = '';
count.value = '';
category.value = '';
total.innerHTML = '';
}

// read
function showData(){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
         </tr>
        `       
    }
    let tbody = document.getElementById('tbody').innerHTML = table ;
}

showData();

// delete 
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}