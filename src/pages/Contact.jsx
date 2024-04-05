import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import { contactTabs } from "../data/contactUs-links"
import ContactUsTab from "../components/cors/ContactUsPage/ContactUsTab";

const Contact = () => {

  return (
    <>
      <div className="py-5">
        <section className="bg-richblack-900 py-5 md:py-14 text-richblack-5 max-w-maxContent mx-auto">
          <div className="flex relative items-start flex-col-reverse xl:flex-row gap-10">
            <div className="sticky bottom-0 border border-richblack-600 max-w-maxContent mx-auto w-11/12 md:w-10/12 lg:w-10/12 xl:w-4/12 p-5 lg:p-10  bg-richblack-800">
              {
                contactTabs.map((tab, index) => {
                  return <ContactUsTab key={index} tab={tab} />
                }
                )
              }
            </div>
            <div className="max-w-maxContent mx-auto w-11/12 md:w-10/12 lg:w-10/12 xl:w-6/12 p-5 lg:p-10 border border-richblack-600">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-3xl font-semibold">
                    Got an Idea? We've got the skills.
                  </h2>
                  <h2 className="text-3xl font-semibold">Let's team up.</h2>
                </div>
                <p className="text-xl mb-7 text-richblack-300">
                  Tell us more about yourself and what's in your mind!
                </p>
              </div>
              <ContactUsForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
