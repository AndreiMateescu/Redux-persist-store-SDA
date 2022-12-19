export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const INCREMENT_QUANTITY_PRODUCT_IN_CART =
  "INCREMENT_QUANTITY_PRODUCT_IN_CART";
export const DECREMENT_QUANTITY_PRODUCT_IN_CART =
  "DECREMENT_QUANTITY_PRODUCT_IN_CART";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    value: product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    value: product,
  };
};

export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    value: product,
  };
};

export const removeProductFromCart = (id) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    value: id,
  };
};

export const incrementQuantityProduct = (id) => {
  return {
    type: INCREMENT_QUANTITY_PRODUCT_IN_CART,
    value: id,
  };
};

export const decrementQuantityProduct = (id) => {
  return {
    type: DECREMENT_QUANTITY_PRODUCT_IN_CART,
    value: id,
  };
};
