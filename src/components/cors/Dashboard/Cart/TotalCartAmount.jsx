import React from 'react'
import { useSelector } from 'react-redux'

const TotalCartAmount = () => {

    const {total,ccartItemsart } = useSelector(state => state.cart)
    const handleBuyCourse = () => {
        const courses = cart.map(course => course._id);
        console.log("Bought these courses : ", courses);
         // #TODO -> api integration for payment gateway
    }

  return (
    <div className='border-t  border-richblack-600 py-5 flex items-center justify-between'>
        <div className='flex text-xl gap-5'>
            <p className=''>Total : </p>
            <p>{`Rs ${total ? total : 0}`}</p>
        </div>

        <button className="text-center flex items-center px-4 py-2 rounded-md text-lg font-semibold bg-yellow-100 hover:bg-yellow-200 focus:hover:bg-yellow-200 text-black active:scale-95 focus:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300 gap-3" onClick={handleBuyCourse}>Buy now</button>
    </div>
  )
}

export default TotalCartAmount