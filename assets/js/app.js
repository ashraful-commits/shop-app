const customer_input_form = document.getElementById("customer_input_form");
const product_upload_form = document.getElementById("product_upload_form");
const msg_customer = document.querySelector(".msg_customer");
const msg_product = document.querySelector(".msg_product");
const Product_tr = document.getElementById("Product_tr");
const edit_modal = document.getElementById("edit_modal");

const customerId = document.getElementById("customerId");

// customer output data

const customer_field = () => {
  let customar_data = getCustomerLsData("customer");

  //  get customer field
  if (!customar_data && customar_data == []) {
    customerId.innerHTML = `<h6 class="text-center">Add new customer</h6>`;
  } else if (customar_data) {
    customerId.innerHTML = `  <div class="col-sm-7">
    <h6 id="NoCustomer"></h6>
      <h6  class="my-2 "><i class="fa-solid fa-user text-primary"></i> Name : <span id="customer_name" class="text-secondary">${customar_data.name}</span></h6>
      <h6 class="my-2"><i class="fa-solid fa-street-view text-primary"></i> Address : <span id="customer_adress" class="text-secondary">${customar_data.adress}</span></h6>
  </div>
  <div class="col-sm-5">
      <h6  class="my-2"><i class="fa-solid fa-phone text-primary"></i> Mobile : <span id="customer_mobile" class="text-secondary" >${customar_data.mobile}</span></h6>
      <h6  class="my-2"><i class="fa-solid fa-calendar text-primary"></i> Date : <span id="customer_date" class="text-secondary">${customar_data.date}</span></h6>
  </div>`;
  }
};
customer_field();

// form submit

customer_input_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const customer_form_data = new FormData(e.target);
  const customer_obj_data = Object.fromEntries(customer_form_data.entries());

  const { name, adress, mobile, date } = customer_obj_data;

  if (!name || !adress || !mobile || !date) {
    msg_customer.innerHTML = setAlert("All fields are required");
  } else if (mobileTest(mobile) == false) {
    msg_customer.innerHTML = setAlert("Mobile in not valid");
  } else {
    customerLs("customer", customer_obj_data);
    customer_field();
    e.target.reset();
  }
});

// produt output field

const product_field = () => {
  let product_data = getProductLsData("product");
  let list = "";
  let total = 0;
  if (!product_data && product_data == "") {
    list = `
        <tr>
        <td colspan='7'>No Product Found</td>
        </tr>
        `;
  }
  if (product_data) {
    product_data.map((item, index) => {
      total += Number(item.price * item.quantity);
      list += `
            <tr class="align-baseline">
            <td>${index + 1}</td>
            <td class="text-capitalize h6">${item.name}</td>
            <td><img style="width:55px;height:55px"  src="${item.image}"></td>
            <td class="text-capitalize h6">${item.price} BDT</td>
            <td class="text-capitalize h6">${item.quantity}</td>
            <td class="text-capitalize h6">${
              item.price * item.quantity
            } BDT</td>
            <td class="d-md-flex justify-content-between">
            <a href="#product_view" data-bs-toggle="modal" index ="${index}" class="btn btn-sm btn-outline-secondary view_product"><i class="fas fa-eye"></i></a>
            <a href="#product_edit" data-bs-toggle="modal" index ="${index}" class="btn btn-sm btn-outline-primary edit_product"><i class="fas fa-edit"></i></a>
            <a href=""  class="btn btn-sm btn-outline-danger remove_product" index ="${index}" ><i class="fas fa-remove"></i></a>
            </td>
            </tr>
            `;
    });

    list += `
        <tr class ="text-white bg-primary">
        <td colspan="3"></td>
        <td colspan="3" class="text-end text-capitalize"><h6>Final Price : ${total} BDT</h6></td>
        <td class=""></td>
        </tr>
        `;
  }
  Product_tr.innerHTML = list;
};
product_field();

// product form submit

product_upload_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product_form_data = new FormData(e.target);
  const product_obj_data = Object.fromEntries(product_form_data.entries());

  const { name, image, price, quantity } = product_obj_data;

  if (!name || !image || !price || !quantity) {
    msg_product.innerHTML = setAlert("All fields are required");
  } else {
    productLs("product", product_obj_data);
    product_field();
    e.target.reset();
  }
});

// product view

Product_tr.onclick = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("view_product")) {
    let index = e.target.getAttribute("index");
    let getViewData = getProductLsData("product");
    let { name, image, price, quantity } = getViewData[index];
    let view_modal = document.getElementById("view_modal");
    view_modal.innerHTML = `
        <div class="text-center text-capitalize">
         <h5>Product Name : ${name}</h5>
         <img class ="w-100 h-100" src="${image}" alt="">
         <hr>
         <h6>Price : ${price} BDT</h6>
         <h6>Quantity : ${quantity} </h6>
         <h6>Total : ${price * quantity} BDT</h6>
       </div>
        `;
  }
  if (e.target.classList.contains("edit_product")) {
    let index = e.target.getAttribute("index");
    let getEditData = getProductLsData("product");
    let { name, image, price, quantity } = getEditData[index];

    edit_modal.innerHTML = `
        
               <div class="my-1">
                <label for="name">Name</label>
                <input class="form-control" value="${name}" type="text" name="name" id="">
                <label for="image">Image</label>
                <input class="form-control" value ="${image}" type="text" name="image" id="">
                <label for="price">Price</label>
                <input class="form-control" value ="${price}" type="text" name="price" id="">
                <label for="quantity">Quantity</label>
                <input class="form-control" value ="${quantity}" type="text" name="quantity">
                <button class="btn btn-primary w-100 mt-3" type="submit">Save</button>
            </div>`;

    edit_modal.addEventListener("submit", (e) => {
      e.preventDefault();

      let edit_form_data = new FormData(e.target);
      let edit_obj_data = Object.fromEntries(edit_form_data.entries());

      let { name, image, price, quantity } = edit_obj_data;
      getEditData[index] = {
        name,
        image,
        price,
        quantity,
      };

      // update ls data
      updateLsdata("product", getEditData);
      product_field();
    });
  } else if (e.target.classList.contains("remove_product")) {
    let AllLsData = getProductLsData("product");
    let index = e.target.getAttribute("index");
    // console.log(AllLsData);

    AllLsData.splice(index, 1);
    updateLsdata("product", AllLsData);
    product_field();
  }
};
