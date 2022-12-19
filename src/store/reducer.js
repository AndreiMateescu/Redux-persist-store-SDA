import uuid4 from "uuid4";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  INCREMENT_QUANTITY_PRODUCT_IN_CART,
  DECREMENT_QUANTITY_PRODUCT_IN_CART,
} from "./action";

const INITIAL_PRODUCTS = [
  {
    id: uuid4(),
    name: "apa",
    price: 1,
    stock: 10,
    description: "apa plata",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "zahar",
    price: 3,
    stock: 100,
    description: "zahar",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "cola",
    price: 2,
    stock: 55,
    description: "suc",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "fanta",
    price: 2,
    stock: 10,
    description: "suc",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "sprite",
    price: 12,
    stock: 90,
    description: "suc",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "paine",
    price: 12,
    stock: 90,
    description: "paine",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "sprite",
    price: 12,
    stock: 90,
    description: "suc",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
  {
    id: uuid4(),
    name: "sprite",
    price: 12,
    stock: 90,
    description: "suc",
    image:
      "https://assets.thehansindia.com/h-upload/2022/07/18/1303611-pro.webp",
  },
];

const INITIAL_STATE = {
  products: INITIAL_PRODUCTS,
  cartProducts: [],
  counter: 0,
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const copyProducts = [...state.products];
      copyProducts.push(action.value);
      return {
        ...state,
        products: copyProducts,
      };
    case DELETE_PRODUCT:
    //
    case ADD_PRODUCT_TO_CART:
      const copyCartProducts = [...state.cartProducts];
      const foundProduct = copyCartProducts.find(
        (copyCartProduct) => copyCartProduct.id === action.value.id
      );
      if (foundProduct) {
        foundProduct.quantity = foundProduct.quantity + 1;

        //1. find index in copyCartProducts => index
        // copyCartProducts[index] = foundProduct

        //2. remove foundProduct from copyCartProducts
        // add new product in copyCartProducts
        const index = copyCartProducts.findIndex(
          (copyCartProduct) => copyCartProduct.id === action.value.id
        );
        copyCartProducts[index] = foundProduct;
      } else {
        const product = { ...action.value };
        product.quantity = 1;
        copyCartProducts.push(product);
      }

      const updatedProducts = [...state.products];
      const foundProductForUpdate = updatedProducts.find(
        (product) => product.id === action.value.id
      );
      const foundIndex = updatedProducts.findIndex(
        (product) => product.id === action.value.id
      );
      foundProductForUpdate.stock = foundProductForUpdate.stock - 1;
      updatedProducts[foundIndex] = foundProductForUpdate;

      return {
        ...state,
        products: updatedProducts,
        cartProducts: copyCartProducts,
      };

    case REMOVE_PRODUCT_FROM_CART:
      const foundDeletedProduct = state.cartProducts.find(
        (product) => product.id === action.value
      );
      const remainingCartProducts = state.cartProducts.filter(
        (product) => product.id !== action.value
      );

      const modifyStockProduct = state.products.find(
        (product) => product.id === action.value
      );
      modifyStockProduct.stock =
        modifyStockProduct.stock + foundDeletedProduct.quantity;

      const updatedNewProducts = [...state.products];
      const indexModifyStockProduct = updatedNewProducts.findIndex(
        (product) => product.id === action.value
      );
      updatedNewProducts[indexModifyStockProduct] = modifyStockProduct;
      return {
        ...state,
        products: updatedNewProducts,
        cartProducts: remainingCartProducts,
      };

    case DECREMENT_QUANTITY_PRODUCT_IN_CART:
      const productsNewCart = [...state.cartProducts];
      const productCartFound = productsNewCart.find(
        (p) => p.id === action.value
      );
      productCartFound.quantity -= 1;
      const cartProductFoundIndex = productsNewCart.findIndex(
        (p) => p.id === action.value
      );
      productsNewCart[cartProductFoundIndex] = productCartFound;

      const productsNew = [...state.products];
      const foundProductOriginal = productsNew.find(
        (p) => p.id === action.value
      );
      foundProductOriginal.stock += 1;
      const foundProductOriginalIndex = newCartProducts.findIndex(
        (p) => p.id === action.value
      );
      productsNew[foundProductOriginalIndex] = foundProductOriginal;

      return {
        ...state,
        products: productsNew,
        cartProducts: productsNewCart,
      };

    case INCREMENT_QUANTITY_PRODUCT_IN_CART:
      const newCartProducts = [...state.cartProducts];
      const foundCartProduct = newCartProducts.find(
        (p) => p.id === action.value
      );
      foundCartProduct.quantity += 1;
      const foundCartProductIndex = newCartProducts.findIndex(
        (p) => p.id === action.value
      );
      newCartProducts[foundCartProductIndex] = foundCartProduct;

      const newProducts = [...state.products];
      const foundOriginalProduct = newProducts.find(
        (p) => p.id === action.value
      );
      foundOriginalProduct.stock -= 1;
      const foundOriginalProductIndex = newCartProducts.findIndex(
        (p) => p.id === action.value
      );
      newProducts[foundOriginalProductIndex] = foundOriginalProduct;

      return {
        ...state,
        products: newProducts,
        cartProducts: newCartProducts,
      };
    default:
      return state;
  }
};

export default reducer;
