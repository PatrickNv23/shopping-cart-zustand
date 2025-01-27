import { create } from "zustand";
import { productsInitialState } from "../constants/initialState";
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(persist(
  (set) => ({
    products: [
      {
        "id": 1,
        "name": "product 1",
        "price": 50
      },
      {
        "id": 2,
        "name": "product 2",
        "price": 30
      },
      {
        "id": 3,
        "name": "product 3",
        "price": 40
      },
      {
        "id": 4,
        "name": "product 4",
        "price": 78
      },
      {
        "id": 5,
        "name": "product 5",
        "price": 90
      },
      {
        "id": 6,
        "name": "product 6",
        "price": 60
      }
    ],
    cart: [],
    totalPriceShoppingCart: 0,

    addToCart: (id) => {
      set((state) => {
        let newProduct = state.products.find((product) => product.id === id)
        return {
          ...state,
          cart: [...state.cart, newProduct]
        };
      })
    },

    deleteFromCart: (id) => {
      set((state) => {
        return {
          ...state,
          cart: state.cart.filter((product) => product.id !== id)
        }
      })
    },

    clearCart: () => {
      set(() => productsInitialState);
    },

    calculateTotalPriceOfCart: () => {
      set((state) => {
        let totalPrice = state.cart.reduce((acc, product) => acc + product.price, 0)
        return {
          ...state,
          totalPriceShoppingCart: totalPrice
        }
      })
    }


  }),
  {
    name: 'products-storage',
    storage: createJSONStorage(() => localStorage)
  }
))