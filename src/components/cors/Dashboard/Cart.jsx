import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCourses from "./Cart/CartCourses";
import TotalCartAmount from "./Cart/TotalCartAmount";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { resetCart } from "../../../slices/CartSlice";
import ActionButton from "../../common/ActionButton";

const Cart = () => { 
  const { total, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full px-5 gap-10 justify-center mx-auto py-10 xl:py-20">
      <h3 className="text-3xl xl:text-4xl text-start">My Wishlist</h3>
      <div className="flex flex-col text-center md:text-start ">
        {
          totalItems > 0
            ? <div className="flex justify-between py-4 md:text-xl text-richblack-5">
                <p> {totalItems} items in Wishlist</p> 
                <ActionButton text="Clear all" onClick={() => dispatch(resetCart())} active="true" >
                  <span className="flex items-center gap-3">
                    <MdDelete />
                    Clear all
                  </span>
                  </ActionButton>
              </div>
            : null
        }

        {totalItems > 0 ? (
          <div className="">
            <CartCourses />
            <TotalCartAmount />
          </div>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-5 text-center text-2xl text-richblack-300"><span className="text-5xl font-bold move-circle"><FaSearch /></span> Looks like your Cart is Empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
