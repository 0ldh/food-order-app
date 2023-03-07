import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartInShown, setCartInShown] = useState<boolean>(false);

  const showCartHandler = () => {
    setCartInShown(true);
  };
  const hideCartHandler = () => {
    setCartInShown(false);
  };

  return (
    <>
      {cartInShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
