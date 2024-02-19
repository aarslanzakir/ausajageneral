import create from 'zustand';

const useStore = create((set) => ({
  cartItems: [],
  totalQuantities: 0,
  totalPrice: 0,
  

  // Define the resetCart function
  resetCart: () => {
    set({
      cartItems: [],
      totalQuantities: 0,
      totalPrice: 0,
    });
  },
}));

export default useStore;
