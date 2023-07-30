// get total
// create product 
// save localstorage
// clear inputs
// read
// count
// delete
// update
// search
// clean data


let tile = document.querySelector('#title');
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
