import { useCallback, useContext, useState } from "react";
import classes from "./checkoutForm.module.css";
import Button from "../../UI/Button";
import CartContext from "../../../store/cart-context";
import axios from "axios";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  postal: "",
  city: "",
};

const CheckOutForm = (props) => {
  const [formInputs, setFormInputs] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});

  const cartCtx = useContext(CartContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // Clear the error for the corresponding input field
    setFormErrors((prevErrors) => {
      return { ...prevErrors, [name]: undefined };
    });
    setFormInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate(formInputs);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      cartCtx.toggleLoading(true);
      const response = await axios.post(
        "https://react-course-fa17c-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        { ...formInputs, items: { ...cartCtx.items } }
      );
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        cartCtx.resetItems();
        cartCtx.toggleLoading(false);
      }
    }
  };

  const validate = useCallback((formInputs) => {
    let errors = {};
    if (formInputs.firstName.trim() === "") {
      errors.firstName = "Name cannot be empty";
    }
    if (formInputs.lastName.trim() === "") {
      errors.lastName = "Last Name cannot be empty";
    }
    if (formInputs.postal.length < 1 || formInputs.postal.length > 5) {
      errors.postal = "Enter a valid postal code";
    }
    if (formInputs.city.trim() === "") {
      errors.city = "City cannot be empty";
    }
    return errors;
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["form-content"]}>
        <div className={classes.form}>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formInputs.firstName}
            onChange={changeHandler}
          />
          {formErrors.firstName && (
            <p className={classes.error}>{formErrors.firstName}</p>
          )}
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formInputs.lastName}
            onChange={changeHandler}
          />
          {formErrors.lastName && (
            <p className={classes.error}>{formErrors.lastName}</p>
          )}

          <label htmlFor="">Postal Code</label>
          <input
            type="number"
            name="postal"
            value={formInputs.postal}
            onChange={changeHandler}
          />
          {formErrors.postal && (
            <p className={classes.error}>{formErrors.postal}</p>
          )}

          <label htmlFor="">City</label>
          <input
            type="text"
            name="city"
            value={formInputs.city}
            onChange={changeHandler}
          />
          {formErrors.city && (
            <p className={classes.error}>{formErrors.city}</p>
          )}
        </div>
        <img
          src="https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg"
          alt=""
        />
      </div>
      <div className={classes.actions}>
        <Button className="button--alt" type="button" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button className="fill" type="submit">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default CheckOutForm;
