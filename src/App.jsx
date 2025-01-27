import { useEffect } from 'react';
import './App.css';
import ProductItem from './components/ProductItem';
import ShoppingCartProduct from './components/ShoppingCartProduct';
import { useStore } from './store/store';

function App() {

  // const [state, dispatch] = useReducer(reducerCart, productsInitialState);

  const {
    products,
    cart,
    totalPriceShoppingCart,
    addToCart,
    deleteFromCart,
    clearCart,
    calculateTotalPriceOfCart,
  } = useStore((state) => state);

  useEffect(() => {
    console.log('cart')
    calculateTotalPriceOfCart()
  }, [cart, calculateTotalPriceOfCart])

  // const addToCart = (id) => {
  //   dispatch({
  //     type: TYPES.ADD_TO_CART,
  //     payload: id
  //   })
  // }

  // const deleteFromCart = (id) => {
  //   dispatch({
  //     type: TYPES.DELETE_PRODUCT_FROM_CART,
  //     payload: id
  //   })
  // }

  // const clearCart = () => {
  //   dispatch({
  //     type: TYPES.DELETE_ALL_FROM_CART
  //   })
  // }

  // const calculateTotalPriceOfCart = () => {
  //   dispatch({ type: TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART })
  // }


  return (
    <>
      <h1 className='title'>E-COMMERCE</h1>
      <hr />
      <h2 className='subtitle_products'>Products in Stock</h2>
      <div className='container_grid_products'>
        {
          products.map((product) => {
            return <ProductItem key={product.id} data={product} addToCart={addToCart} />
          })
        }
      </div>

      <hr />
      <h2 className='subtitle_shopping_cart'>Shopping Cart</h2>
      <div className='container_buttons'>
        <button className='btn btn_totalPrice' onClick={() => calculateTotalPriceOfCart()}>Total Price</button>
        {totalPriceShoppingCart > 0 && <p className='totalPrice_shoppingCart'>Total Price: {totalPriceShoppingCart}</p>}
        <button className='btn btn_ClearCart' onClick={() => clearCart()}>Clear cart</button>
      </div>
      {
        cart.length === 0 && <p className='text_NoProductsInCart'>There are no products in the cart</p>
      }

      <div className='container_grid_shopping_cart'>


        {
          cart.map((productCart) => {
            return <ShoppingCartProduct key={productCart.id + (Math.random() * 50)} data={productCart} deleteFromCart={deleteFromCart} />
          })
        }
      </div>
    </>
  )
}

export default App
