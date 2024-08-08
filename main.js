// Get DOM elements
let fruImg = document.getElementById("fruImg");
let fruName = document.getElementById("fruName");
let fruPrice = document.getElementById("fruPrice");
let fruDiscount = document.getElementById("fruDiscount");
let fruCount = document.getElementById("fruCount");

// Initialize fruitList from localStorage or as an empty array
let fruitList = localStorage.getItem("fruitList")
  ? JSON.parse(localStorage.getItem("fruitList"))
  : [];
if (fruitList.length > 0) showData();

// Add product on form submit
document.getElementById("fruitForm").addEventListener("submit", addProduct);

function addProduct(event) {
  event.preventDefault();
  const file = fruImg.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fruit = {
        name: fruName.value,
        discountedPrice: fruDiscount.value,
        oldPrice: fruPrice.value,
        image: e.target.result,
        quantity: parseInt(fruCount.value, 10), // Ensure quantity is a number
      };
      fruitList.push(fruit);
      console.log(fruitList);
      showData();
      localStorage.setItem("fruitList", JSON.stringify(fruitList));
      clearForm();
    };
    reader.readAsDataURL(file);
  }
}
function clearForm() {
  fruName.value = "";
  fruPrice.value = "";
  fruDiscount.value = "";
  fruCount.value = "";
  fruImg.value = "";
}

// Display data on the page
function showData() {
  let cartona = "";
  for (let i = 0; i < fruitList.length; i++) {
    cartona += `
      <div class="card">
        <div class="card-img">
          <img src="${fruitList[i].image}" alt="${fruitList[i].name}">
        </div>
        <div class="card-info">
          <h3>${fruitList[i].name}</h3>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
          <div class="price-del-upd">
            <div class="price">
              <p>${fruitList[i].discountedPrice}$ <span class="old-price">${fruitList[i].oldPrice}$</span></p>
            </div>
            <div class="del-upd">
              <i class="fa-solid fa-pen-to-square" id="update"></i>
              <i class="fa-solid fa-trash" id="delete" onclick="deleteProduct(${i})"></i>
            </div>
          </div>
          <div class="flex-que">
            <div class="quantity">
              <button onclick="decreaseQuantity(${i})">-</button>
              <input id="quantity-${i}" type="text" value="${fruitList[i].quantity}" readonly>
              <button onclick="increaseQuantity(${i})">+</button>
            </div>
            <div class="btn">
              <button class="buy-now">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("catalog").innerHTML = cartona;
}

// Increase quantity
function increaseQuantity(index) {
  fruitList[index].quantity++;
  document.getElementById(`quantity-${index}`).value =
    fruitList[index].quantity;
  localStorage.setItem("fruitList", JSON.stringify(fruitList));
}

// Decrease quantity and delete if less than 1
function decreaseQuantity(index) {
  fruitList[index].quantity--;
  if (fruitList[index].quantity < 1) {
    // Remove the fruit from the list if quantity is less than 1
    fruitList.splice(index, 1);
  }
  // Update the local storage
  localStorage.setItem("fruitList", JSON.stringify(fruitList));
  // Refresh the displayed data
  showData();
}

// Delete product
function deleteProduct(index) {
  fruitList.splice(index, 1);
  localStorage.setItem("fruitList", JSON.stringify(fruitList));
  showData();
}
