import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";

const CartCourses = () => {
  //   const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  // mock data for styling
  const cart = [
    {
      id: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      courseTitle: "Introduction to React",
      category: {
        id: 101,
        name: "Web Development",
      },
      rating: 4.5,
      ratingAndReviews: [{ rating: 5 }, { rating: 4 }, { rating: 4.5 }],
      price: 50,
    },
    {
      id: 2,
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      courseTitle: "JavaScript Basics",
      category: {
        id: 102,
        name: "Web Development",
      },
      rating: 4.5,
      ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 3.5 }],
      price: 40,
    },
    {
      id: 3,
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      courseTitle: "Python for Beginners",
      category: {
        id: 103,
        name: "Programming",
      },
      rating: 4,
      ratingAndReviews: [{ rating: 5 }, { rating: 4.5 }, { rating: 5 }],
      price: 60,
    },
  ];

  return (
    <div className="flex flex-col">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-10 border-t border-richblack-600"
        >
          <div className="flex gap-5 items-center">
            <img className="w-[200px]" src={course?.thumbnail} alt="" />
            <div>
              <h3 className="text-xl font-semibold">{course?.courseTitle}</h3>
              <p className="text-richblack-300">{course?.category?.name}</p>
              <div className="flex items-center gap-3">
                <div className="py-2 text-xl">4.5</div>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  color1="#fff"
                  color2="#ffd700"
                  value={course?.rating}
                />
              </div>
              <p>Total Ratings : {course?.ratingAndReviews?.length}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <p className="text-xl">
              Rs.
              {" " + course?.price}
            </p>
            <button
              className="text-center flex items-center px-4 py-2 rounded-md text-lg bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3"
            //   onClick={() => dispatch(removeFromCart(course?._id))}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
