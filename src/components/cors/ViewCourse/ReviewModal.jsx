import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component';
import ActionButton from '../../common/ActionButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const ReviewModal = ({ reviewModal, setReviewModal }) => {

  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const {courseEntireData} = useSelector(state => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setValue("courseReviewData", "");
    setValue("courseRating", 0);

  }, [])

  const onSubmit = async (data) => {
    await createRating({ courseId:courseEntireData._id, rating: data?.courseRating, review: data.reviewField }, token)
    setReviewModal(false);
  }

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  return (
    <div className='absolute top-0 w-full bg-opec flex items-center justify-center h-full'>
      <div className='flex flex-col gap-3 bg-richblack-700 p-5 rounded-lg'>
        <div className='flex justify-between'>
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            Close
          </button>
        </div>

        {/* modal body */}
        <div>
          <div className='flex items-center gap-5'>
            <img src={user?.image} className='rounded-full max-w-[100px]' alt="" />
            <div>
              <p>{user?.firstName} {user?.lastName}</p>
              <p>Posting Publically</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-5' >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor={'#ff00ff'}
            />

            <div className='space-y-3'>
              <label htmlFor="reviewField">your Experience</label>
              <textarea
                name="reviewField"
                placeholder='Write your Experience here...'
                id="reviewField"
                cols="50"
                rows="5"
                {...register("reviewField", { required: true })}
                className='w-full rounded-lg bg-richblack-800 p-3'
              ></textarea>
              {
                errors.reviewField && <span className='text-richblack-5 w-max'>Please Add your Experience</span>
              }
            </div>
            <div className='flex self-end gap-3'>
              <ActionButton onClick={() => setReviewModal(false)}>Cancel</ActionButton>
              <ActionButton active type={"submit"} >Submit</ActionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal