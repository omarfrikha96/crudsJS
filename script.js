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

let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let category = document.querySelector("#category");
let count = document.querySelector("#count");
let submit = document.querySelector("#submit");
let mood = "create"; // update
let tmp; // update

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#b10505";
  }
}

// create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "create") {
    //update
    if (newPro.count > 1) {
      //count
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    } //////count
  } else {
    //update
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  // save localstorage
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData(); // read
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read
function showData() {
  getTotal(); // update
  let table = "";
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
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
         </tr>
        `;
  }
  let tbody = (document.getElementById("tbody").innerHTML = table);
  let btndelete = document.getElementById("deleteAll"); // delete ALL btn
  if (dataPro.length > 0) {
    btndelete.innerHTML = `
        <button onclick="deleteAll()" >Delete All (${dataPro.length})</button>
        `;
  } else {
    btndelete.innerHTML = "";
  }
}

showData();

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// delete ALL
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  }); //scroll to top
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTtile") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search by " + searchMood;

  search.focus(); // when user click btn focus on search bar
  search.value = '';   // search
  showData();   // search
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
      if (searchMood == "title") {  
          if (dataPro[i].title.includes(value.toLowerCase())) {
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
                              <td><button onclick="updateData(${i})" id="update">update</button></td>
                              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                          </tr>
                          `;       
          }      
      } else {
          if (dataPro[i].category.includes(value.toLowerCase())) {
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
                              <td><button onclick="updateData(${i})" id="update">update</button></td>
                              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                          </tr>
                          `;
          }
      }
    }
   
    let tbody = (document.getElementById("tbody").innerHTML = table);
  }


