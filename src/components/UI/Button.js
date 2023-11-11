import classes from "./Button.module.css";

const Button = (props) => {
  const allClasses = `${classes.button} ${classes[props.className]}`;

  return (
    <button onClick={props.onClick} className={allClasses} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
