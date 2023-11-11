import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartContext from "../../store/cart-context";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const cartCtx = useContext(CartContext);
  const { isLoading, toggleLoading } = cartCtx;

  useEffect(() => {
    const getMeals = async () => {
      toggleLoading(true);
      const response = await axios.get(
        "https://react-course-fa17c-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      setMeals(response.data);
      toggleLoading(false);
    };

    getMeals();
  }, [toggleLoading]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={+meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className={classes.loading}>Loading... ITEMS</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
