import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vel natus
        ratione odio quos est voluptas tenetur cum doloremque. Id doloremque
        distinctio, iste ratione optio dignissimos natus repellat nam modi
        magnam quisquam rem temporibus, minus a culpa. Eius, consequuntur non.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => {
          return <PizzaCard key={pizza._id} pizza={pizza} />;
        })}
      </div>
    </div>
  );
};

export default PizzaList;
