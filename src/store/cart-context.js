import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetItems: () => {},
  isLoading: false,
  toggleLoading: (value) => {},
});

export default CartContext;
