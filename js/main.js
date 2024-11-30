var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");

var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");

var inputs = document.getElementsByClassName("form-control");
var currentIndex = 0;

var products = [];
// to load data from local storage in the startup page
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayData();
}
//localStorage.setItem('test','habmozo');
addBtn.onclick = function () {
  if (addBtn.innerHTML == "add product") {
    //add mode
    addProduct();
  } else {
    //update mode
    updateProduct();
  }
  displayData();
  clearForm();
};
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  products.push(product);
  localStorage.setItem("productsList", JSON.stringify(products));
}
function displayData() {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona += `<tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
                <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
               </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayData();
  localStorage.setItem("productsList", JSON.stringify(products));
}
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  productNameInput.classList.remove("is-valid");
  productNameInput.classList.remove("is-invalid");
  productPriceInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-invalid");
  productCategoryInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-invalid");
  productDescInput.classList.remove("is-valid");
  productDescInput.classList.remove("is-invalid");
  addBtn.disabled = "true";
}

searchInput.onkeyup = function () {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    // if (products[i].name.toLowerCase().startsWith(searchInput.value.toLowerCase())) {
    if (
      products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      cartona += `<tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>update</button></td>
            <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>delete</button></td>
           </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
};

function getProductInfo(index) {
  currentIndex = index;
  var currentProduct = products[index];
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productCategoryInput.value = currentProduct.category;
  productDescInput.value = currentProduct.desc;
  addBtn.innerHTML = "update product";
}
function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  products[currentIndex] = product;
  localStorage.setItem("productsList", JSON.stringify(products));
  addBtn.innerHTML = "add product";
}

//validation by regex pattern

var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var catAlert = document.getElementById("catAlert");
var descAlert = document.getElementById("descAlert");
var nameCheck = false;
var priceCheck = false;
var catCheck = false;
var descCheck = false;

function validateForm() {
  // Enable the add button only when all checks are true
  if (nameCheck && priceCheck && catCheck && descCheck) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "true");
  }
}

productNameInput.onkeyup = function () {
  var regex = /^[a-zA-Z]{2,}$/;
  if (regex.test(productNameInput.value)) {
    nameCheck = true;
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    nameCheck = false;
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
  if (productNameInput.value == "") {
    addBtn.disabled = "true";
    productNameInput.classList.remove("is-valid");
    productNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  }
  validateForm();
};

productPriceInput.onkeyup = function () {
  var regex = /^(\d+([.,]\d{1,2})?)$/;
  if (regex.test(productPriceInput.value)) {
    priceCheck = true;
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
  } else {
    priceCheck = false;
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
  }
  if (productPriceInput.value == "") {
    addBtn.disabled = "true";
    productPriceInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
  }
  validateForm();
};

productCategoryInput.onkeyup = function () {
  var regex = /^[a-zA-Z]{2,}$/;
  if (regex.test(productCategoryInput.value)) {
    catCheck = true;
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    catAlert.classList.add("d-none");
  } else {
    catCheck = false;
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    catAlert.classList.remove("d-none");
  }
  if (productCategoryInput.value == "") {
    addBtn.disabled = "true";
    productCategoryInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    catAlert.classList.add("d-none");
  }
  validateForm();
};
productDescInput.onkeyup = function () {
  var regex = /^.{5,}$/; // Description must have at least 5 characters
  if (regex.test(productDescInput.value)) {
    descCheck = true;
    productDescInput.classList.add("is-valid");
    productDescInput.classList.remove("is-invalid");
    descAlert.classList.add("d-none");
  } else {
    descCheck = false;
    productDescInput.classList.add("is-invalid");
    productDescInput.classList.remove("is-valid");
    descAlert.classList.remove("d-none");
  }
  if (productDescInput.value == "") {
    addBtn.disabled = "true";
    productDescInput.classList.remove("is-valid");
    productDescInput.classList.remove("is-invalid");
    descAlert.classList.add("d-none");
  }
  validateForm();
};
