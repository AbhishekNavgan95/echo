import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

function ContactFormSection() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl xl:text-4xl  text-center font-bold">Get in touch</h2>
      <p className="text-center text-xl text-richblack-300">
        we'd love to here form you, PLease fill out this form
      </p>
      <div className="w-full md:w-10/12 xl:w-[50%] mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
}

export default ContactFormSection;
