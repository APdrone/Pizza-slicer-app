import axios from "axios";
import Head from "next/head";
// import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best Pizza in Town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  // console.log(
  //   myCookie.token === process.env.TOKEN,
  //   myCookie.token,
  //   process.env.TOKEN
  // );
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  // console.log(process.env.API_URL);
  // const res = await axios.get("http://localhost:3000/api/v1/products");
  const res = await axios.get(`${process.env.API_URL}/api/v1/products`);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
