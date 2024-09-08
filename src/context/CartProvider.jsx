import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/userContext"; 

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useAuth(); 
  const [productsCart, setProductsCart] = useState([]);

 
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      if (storedCart) {
        setProductsCart(JSON.parse(storedCart));
      }
    }
  }, [user]);

  function addProductToCart(product) {
    const copyProductsCart = [...productsCart];
    const itemIndex = copyProductsCart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      copyProductsCart[itemIndex].qtd += 1;
    } else {
      copyProductsCart.push({ ...product, qtd: 1 });
    }

    setProductsCart(copyProductsCart);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(copyProductsCart));
    }
  }

  function removeProductToCart(id) {
    const copyProductsCart = [...productsCart];
    const itemIndex = copyProductsCart.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      if (copyProductsCart[itemIndex].qtd > 1) {
        copyProductsCart[itemIndex].qtd -= 1;
      } else {
        copyProductsCart.splice(itemIndex, 1);
      }
    }

    setProductsCart(copyProductsCart);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(copyProductsCart));
    }
  }

  return (
    <CartContext.Provider value={{ productsCart, addProductToCart, removeProductToCart }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
