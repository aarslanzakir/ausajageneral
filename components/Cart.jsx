import React, { useContext, useEffect, useRef } from "react";

import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { useStore } from "../store/store";

import { useState } from "react";
import Image from "next/image";

import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import Layout from "./Layout";
import Modal from "../components/Modal";
import styles from "../styles/Modal.module.css";
import { useRouter } from "next/router";

const Cart = () => {
  const cartRef = useRef();

  const router = useRouter(); // Initialize the router

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    resetCart,
  } = useStateContext();
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false); // Add orderPlaced state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItemToCart = (item) => {
    addToCart(item);
  };

  const removeItemFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const clearCart = () => {
    resetCart();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowCart(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnDelivery = () => {
    setIsModalOpen(true);
    setPaymentMethod("Cash On Delivery");
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });

    // Close the modal and reset cart state after checkout
    setIsModalOpen(false);
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  src={urlFor(item?.image[0]).url()}
                  className="cart-product-image"
                  alt="cartimg"
                  width={250} // Add the width attribute
                  height={250} // Add the height attribute
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
              <button
                type="button"
                className="cod-btn"
                onClick={handleOnDelivery}
              >
                Cash On Delivery
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </div>
  );
};

export default Cart;
