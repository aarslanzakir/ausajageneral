import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";
import { useStateContext } from "../context/StateContext";
import { createOrder } from "../lib/orderHandler";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import useStore from "../store/store";

const Modal = ({ isOpen, onClose, children }) => {
  const router = useRouter();
  const { totalPrice } = useStateContext();

  const [FormData, setFormData] = useState({});
  const [total, setTotal] = useState("");
  const resetCart = useStore((state) => state.resetCart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const total = localStorage.getItem("totalPrice") || "";
      setTotal(total);
    }
  }, []);

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, totalPrice });
    toast.success("Order Placed");
    resetCart();
    onClose(); // Close the modal
    if (typeof window !== "undefined") {
      localStorage.setItem("order", id);
    }
    router.push(`/success`); // Redirect to the success page
  };

  // Close the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closebutton}>
          X
        </button>
        <form
          onSubmit={handleSubmit}
          action=""
          className={styles.formContainer}
        >
          <input
            onChange={handleInput}
            type="text"
            name="name"
            required
            placeholder="Name"
          />
          <input
            onChange={handleInput}
            type="text"
            name="phone"
            required
            placeholder="Phone Number"
          />
          <textarea
            onChange={handleInput}
            name="address"
            cols={8}
            rows={3}
            placeholder="Address"
          ></textarea>
          <span>
            You will pay <span>${totalPrice}</span> on delivery
          </span>
          <button type="submit" className="btn">
            Place Order
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Modal;
