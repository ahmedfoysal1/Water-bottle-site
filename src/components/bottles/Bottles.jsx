import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../bottle/Bottle";
import "./Bottles.css";
import { addToLs, getStoredCart } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  //load cart data from local storage
  useEffect(() => {
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      console.log(storedCart);
      const savedCart = [];
      for(const id of storedCart){
        console.log(id);
        const bottle = bottles.find(bottle => bottle.id === id)
        if(bottle){
          savedCart.push(bottle);
        }
      }
      console.log(savedCart);
      setCart(savedCart);

    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLs(bottle.bottle.id);
  };

  return (
    <div>
      <h2>Bottles here : {bottles.length}</h2>
      <Cart cart={cart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={{ bottle }}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
