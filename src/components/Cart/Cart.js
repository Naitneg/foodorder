import { useContext, useEffect, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CheckOutForm from "../checkout/Form/checkoutForm";
import Button from "../UI/Button";

const Cart = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  useEffect(() => {
    if (!hasItems) {
      setOpenForm(false);
    }
  }, [hasItems]);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const formHandler = () => {
    setOpenForm(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {cartCtx.isLoading && <p>Sending data to server...</p>}

      {openForm && hasItems && <CheckOutForm onCancel={props.onClose} />}
      <div className={classes.actions}>
        {!openForm && (
          <Button className="button--alt" onClick={props.onClose}>
            Close
          </Button>
        )}
        {hasItems && !openForm && (
          <Button className="fill" onClick={formHandler}>
            Order
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
