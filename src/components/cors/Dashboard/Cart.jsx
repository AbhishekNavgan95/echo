import React from "react";
import { useSelector } from "react-redux";
import CartCourses from "./Cart/CartCourses";
import TotalCartAmount from "./Cart/TotalCartAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center mx-auto py-10 xl:py-20">
      <h3 className="text-3xl xl:text-4xl font bold">My Wishlist</h3>
      <div className="flex flex-col">
        <p className="pb-4 text-xl text-richblack-300">{totalItems} Courses in Wishlist</p>

        {!total > 0 ? (
          <div className="">
            <CartCourses />
            <TotalCartAmount />
          </div>
        ) : (
          <div>Your Cart is Empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
