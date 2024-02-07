import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import { MdAlternateEmail } from "react-icons/md";
import { SiOnlyoffice } from "react-icons/si";
import { FaHeadphonesAlt } from "react-icons/fa";

const Contact = () => {
  // const cotactTabs = [
  //   {
  //     icon: "<MdAlternateEmail /> ",
  //     title: "Connect with us",
  //     description1 : "Our team is here to help",
  //     description2 : "echo@gmail.com"
  //   },
  //   {
  //     icon: "SiOnlyoffice",
  //     title: "Visit us",
  //     description1 : "Come and say hellp at our office / HQ",
  //     description2 : "Cornerstone Plaza, Suite 302, Oakwood"
  //   },
  //   {
  //     icon: "FaHeadphonesAlt",
  //     title: "Call us",
  //     description1 : "Mon - Fri From 9am to 5pm",
  //     description2 : "123-456-789"
  //   }
  // ]

  return (
    <>
      <div className="py-10">
        <section className="bg-richblack-900 py-5 md:py-14 text-white max-w-maxContent mx-auto">
          <div className="flex items-start flex-col-reverse xl:flex-row gap-10">
            <div className="max-w-maxContent mx-auto w-11/12 md:w-10/12 lg:w-10/12 xl:w-4/12 p-10 bg-richblack-800">
              <div className="py-4 flex gap-3 items-start">
                <div className="text-xl mt-2">
                  <MdAlternateEmail />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl">Connect with us</h3>
                  <p className="text-richblack-300">Our team is here to help</p>
                  <p className="text-richblack-300">echo@gmail.com</p>
                </div>
              </div>
              <div className="py-3 flex gap-3 items-start">
                <div className="text-xl mt-2">
                  <SiOnlyoffice />
                </div>
                <div className="flex  flex-col gap-1">
                  <h3 className="text-xl">Visit us</h3>
                  <p className="text-richblack-300">Come and say hellp at our office / HQ</p>
                  <p className="text-richblack-300">Cornerstone Plaza, Suite 302, Oakwood</p>
                </div>
              </div>
              <div className="py-3 flex gap-3 items-start">
                <div className="text-xl mt-2">
                  <FaHeadphonesAlt />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl">Call uss</h3>
                  <p className="text-richblack-300">Mon - Fri From 9am to 5pm</p>
                  <p className="text-richblack-300">123-456-789</p>
                </div>
              </div>
            </div>
            <div className="max-w-maxContent mx-auto w-11/12 md:w-10/12 lg:w-10/12 xl:w-6/12 p-10 border border-richblack-600">
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
