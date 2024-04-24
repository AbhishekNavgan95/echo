import React, { useState, useEffect } from 'react'
import ActionButton from "../../common/ActionButton"
import { createCategory } from '../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import AdminInstruction from './createCategory/AdminInstruction';

const AddCategory = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CategoryName: "",
    description: ""
  });
  const { token } = useSelector(state => state.auth);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.CategoryName,
      description: formData.description
    }
    const res = await createCategory(data, token);
    if (res) {
      setFormData({
        CategoryName: "",
        description: ""
      })
    }
  }

  return (
    <div className="w-full text-richblack-5">
      <div className="flex flex-col w-full px-5 gap-10 justify-between mx-auto py-10 xl:py-20" >
        <h2 className="text-3xl xl:text-4xl font bold">Create New Category</h2>
        <div className='flex w-full gap-5 flex-col lg:flex-row'>
          <section className="flex flex-col w-full mx-auto md:w-8/12 lg:w-full gap-5 justify-between bg-richblack-900 border border-richblack-600 p-5 lg:p-10 rounded-lg">
            <p className='text-3xl'>Add Category</p>
            <form
              className='flex flex-col gap-5 mx-auto w-full'
              onSubmit={(e) => submitHandler(e)}
            >
              <div className='flex flex-col gap-3'>
                <label htmlFor="CategoryName">Enter Category Name</label>
                <input
                  type="text"
                  name='CategoryName'
                  id='CategoryName'
                  required
                  value={formData.CategoryName}
                  onChange={changeHandler}
                  placeholder='Category Name'
                  className="w-full py-3 px-3 md:text-xl shadow-sm shadow-richblack-300 bg-richblack-800 text-richblack-5 rounded-lg focus:outline-none"
                />
              </div>
              <div className='flex flex-col gap-3'>
                <label htmlFor="description">Enter Category Description</label>
                <textarea
                  type="text"
                  name='description'
                  id='description'
                  value={formData.description}
                  onChange={changeHandler}
                  required
                  placeholder='Category Description'
                  rows={5}
                  className="md:text-xl bg-richblack-800 py-3 px-4 rounded-lg focus:outline-none shadow-sm shadow-richblack-300"
                ></textarea>
              </div>
              <ActionButton active >{loading ? "Loading..." : "Create"}</ActionButton>
            </form>
          </section>
          <section className="flex flex-col md:flex-row gap-10 w-full mx-auto md:w-8/12 lg:w-full justify-between items-start bg-richblack-900 border border-richblack-600 p-5 lg:p-10 rounded-lg">
            <div className='w-full h-full'>
              <AdminInstruction />
            </div>
          </section>
        </div>
      </div >
    </div >
  )
}

export default AddCategory