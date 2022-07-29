const setAlert = (msg, type = "danger") => {
  return `<h6 class="alert alert-${type}">${msg}</h6>`;
};

// customar datials field

const customerLs = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// return customar ls data

const getCustomerLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return false;
  }
};

// product data localStorage

const productLs = (key, value) => {
  let product_array = [];

  if (localStorage.getItem(key)) {
    product_array = JSON.parse(localStorage.getItem(key));
  }
  product_array.push(value);
  localStorage.setItem(key, JSON.stringify(product_array));
};

// return customar ls data

const getProductLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return false;
  }
};

// update localStorage

const updateLsdata = (key, edit_array) => {
  return localStorage.setItem(key, JSON.stringify(edit_array));
};

// mobile test

let mobileTest = (num) => {
  let pattern = /^(019|018|017|013|\+8801|8801)[0-9]{8}$/;
  return pattern.test(num);
};
