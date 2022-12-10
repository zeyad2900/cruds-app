let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(6, 146, 6)";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(105, 20, 20)";
  }
}
// create product
let myData;
if (localStorage.product != null) {
  myData = JSON.parse(localStorage.product);
} else {
  myData = [];
}
submit.onclick = function () {
  proData = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (title.value !== "" && price.value !== "" && category.value !== "") {
    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          myData.push(proData);
        }
      } else {
        myData.push(proData);
      }
    } else {
      myData[tmp] = proData;
      count.style.display = "block";
      mood = "create";
      submit.innerHTML = "Create";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(myData));
  showData();
};
//show data
function showData() {
  getTotal();
  let tbody = document.getElementById("tbody");
  let table = "";
  for (let i = 0; i < myData.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${myData[i].title}</td>
    <td>${myData[i].price}</td>
    <td>${myData[i].taxes}</td>
    <td>${myData[i].ads}</td>
    <td>${myData[i].discount}</td>
    <td>${myData[i].total}</td>
    <td>${myData[i].category}</td>
    <td><button onclick="updateData(${i})">update</button></td>
    <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  tbody.innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (myData.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">delete all (${myData.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// delete
function deletePro(i) {
  myData.splice(i, 1);
  localStorage.product = JSON.stringify(myData);
  showData();
}
function deleteAll() {
  myData.splice(0);
  localStorage.clear();
  showData();
}
// update
function updateData(i) {
  title.value = myData[i].title;
  price.value = myData[i].price;
  taxes.value = myData[i].taxes;
  ads.value = myData[i].ads;
  discount.value = myData[i].discount;
  getTotal();
  category.value = myData[i].category;
  submit.innerHTML = "update";
  mood = "update";
  count.style.display = "none";
  tmp = i;
}
// search
let searchMood = "title";
function getSearchMood(id) {
  let ser = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    ser.placeholder = "search by title";
  } else {
    searchMood = "category";
    ser.placeholder = "search by category";
  }
  ser.focus();
  ser.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < myData.length; i++) {
      if (myData[i].title.includes(value)) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${myData[i].title}</td>
        <td>${myData[i].price}</td>
        <td>${myData[i].taxes}</td>
        <td>${myData[i].ads}</td>
        <td>${myData[i].discount}</td>
        <td>${myData[i].total}</td>
        <td>${myData[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < myData.length; i++) {
      if (myData[i].category.includes(value)) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${myData[i].title}</td>
        <td>${myData[i].price}</td>
        <td>${myData[i].taxes}</td>
        <td>${myData[i].ads}</td>
        <td>${myData[i].discount}</td>
        <td>${myData[i].total}</td>
        <td>${myData[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// clean date
