import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/CartSlice";
import ActionButton from "../../../common/ActionButton";
import RatingStars from "../../../common/RatingStars";

const CartCourses = () => {

  const { cartItems } = useSelector(state => state.cart);
  // console.log("cartItems : ", cartItems);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col text-richblack-5">
      {cartItems.map((course, index) => (
        <div
          key={index}
          className="w-full flex flex-col lg:flex-row gap-y-3 items-start lg:items-center justify-between py-5 md:py-10 border-t border-richblack-600"
        >
          <div className="w-full flex gap-5 items-stretch md:items-center">
            <img className="w-[90px] aspect-video md:w-[250px] rounded-lg object-cover" src={course?.thumbnail} alt="" />
            <div className="flex items-start flex-col gap-2">
              <h3 className="text-xl text-start font-semibold">{course?.courseTitle}</h3>
              <p className="py-1 border text-yellow-100 border-yellow-100 text-sm font-semibold w-max px-3 rounded-lg ">{course?.category?.name}</p>
              <div className="flex items-center gap-3">
                <div className="text-xl">4.5</div>
                {/* <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  color1="#fff"
                  color2="#ffd700"
                  value={course?.rating}
                /> */}
                {
                  console.log("course : ",course)
                }
                <RatingStars reviewCount={course?.ratingAndReviews?.length} />
              </div>
              <p className="text-richblack-300">Total Ratings : {course?.ratingAndReviews?.length}</p>
            </div>
          </div>
          <div className="w-full lg:w-max gap-5 flex items-center justify-between lg:justify-end">
            <p className="text-xl text-nowrap">
              {
                `Rs. ${course?.price}`
              }
            </p>
            <ActionButton
              active="true"
              className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3"
              onClick={() => dispatch(removeFromCart(course?._id))}
            >
              <span className="flex items-center gap-3">
              <MdDelete />
              Remove
              </span>
            </ActionButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
