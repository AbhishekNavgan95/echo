import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCourses from "./Cart/CartCourses";
import TotalCartAmount from "./Cart/TotalCartAmount";
import { CiSearch } from "react-icons/ci";
import { resetCart } from "../../../slices/CartSlice";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-11/12 md:w-9/12 gap-10 justify-center mx-auto py-10 xl:py-20">
      <h3 className="text-3xl xl:text-4xl text-center md:text-start">My Wishlist</h3>
      <div className="flex flex-col text-center md:text-start">
        {
          totalItems > 0
            ? <div className="flex justify-between py-2 text-xl text-richblack-5"><p> {totalItems} items in Wishlist</p> <span><button onClick={() => dispatch(resetCart())} className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3 font-semibold">Clear all</button></span> </div>
            : null
        }

        {totalItems > 0 ? (
          <div className="">
            <CartCourses />
            <TotalCartAmount />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5 text-center text-xl text-richblack-300"><span className="text-4xl"><CiSearch /></span> Looks like your Cart is Empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
