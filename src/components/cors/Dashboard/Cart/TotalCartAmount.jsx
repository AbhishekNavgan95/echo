import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActionButton from '../../../common/ActionButton'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operations/StudentFeaturesAPI'
import toast from "react-hot-toast"

const TotalCartAmount = () => {

  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { total, cartItems } = useSelector(state => state.cart)
  const handleBuyCourse = () => {
    const courses = cartItems.map(course => course._id);

    if (token) {
      buyCourse(token, [courses], user, navigate, dispatch)
      return
    }

    toast.error("Something went wrong, please try later");
  }

  return (
    <div className='border-t  border-richblack-600 py-5 flex items-center justify-between'>
      <div className='flex md:text-xl gap-5'>
        <p className=''>Total : </p>
        <p>{`Rs ${total ? total : 0}`}</p>
      </div>

      <ActionButton
        active={true}
        style="text-center flex items-center px-4 py-2 rounded-md text-lg font-semibold bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3" onClick={handleBuyCourse}>
        Buy now
      </ActionButton>
    </div>
  )
}

export default TotalCartAmount