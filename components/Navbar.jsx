import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, BsReceipt } from 'react-icons/ai'
import { UilReceipt} from '@iconscout/react-unicons'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [Order,setOrder]=useState("")
  useEffect(()=>{
    setOrder(localStorage.getItem("order")); 
  },[])
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Ausaja General Trading</Link>
      </p>
<div className="cart-icons">
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
      {Order && (
        <Link href={`/order/${Order}`}>
          <div className="receipt-icon">
            <UilReceipt  />
            {Order !="" && <div className="receipt-item-qty">1</div>}
          </div>
          </Link>
          )}
    </div>
    </div>
  )
}

export default Navbar