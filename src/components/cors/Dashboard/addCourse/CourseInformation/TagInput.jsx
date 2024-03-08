import React from "react";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TagInput = ({ name, label, register, errors, setValue, placeholder }) => {
  const [tags, setTags] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
    if (editCourse) {
      setTags(course?.tag?.split(","));
      setValue(name, course?.tag);
    }
  }, []);

  return (
    <div>
      <label htmlFor={name}>
        {`${label} `}
        <sup>*</sup>
      </label>
      <div className="flex flex-wrap gap-2 my-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="my-1 px-4 flex items-center rounded-full bg-yellow-400 py-1 text-lg text-richblack-25"
          >
            <span className="text-richblack-5">{tag}</span>
            <button
              type="button"
              onClick={() => {
                const updatedTags = [...tags];
                updatedTags.splice(index, 1);
                setTags(updatedTags);
                setValue(name, updatedTags);
              }}
              className="ml-2 text-richblack-5"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className="text-xl bg-richblack-800 w-full py-3 px-4 rounded-lg focus:outline-none shadow-sm shadow-richblack-300"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (e.target.value) {
              setTags([...tags, e.target.value]);
              setValue(name, [...tags, e.target.value]);
              e.target.value = "";
            }
          }
        }}
      />
      {errors[name] && (
        <span className="text-xs text-pink-200">Tags are required</span>
      )}
    </div>
  );
};

export default TagInput;