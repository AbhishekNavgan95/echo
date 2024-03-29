import React from "react";
import HighlightText from "../components/common/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import CtaButton from "../components/common/CtaButton";
import LearningGrid from "../components/cors/AboutPage/LearningGrid";
import Quote from "../components/cors/AboutPage/Quote";
import ContactFormSection from "../components/cors/AboutPage/ContactFormSection";
// h2
const About = () => {
  return (
    <div className="min-h-screen px-5 bg-richblack-900 text-white">
      {/* section 1 */}
      <div className="bg-richblack-800 relative ">
        <div className=" max-w-maxContent mx-auto">
          <section className="md:py-10 lg:pb-20">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-5 my-10 " >
                <h2 className="text-3xl xl:text-4xl font-bold text-center md:w-[80%] xl:w-[55%]">
                  Driving Innovation in Online Education for a
                  <HighlightText text="Brighter Future" />
                </h2>
                <p className="text-center text-md md:text-xl text-richblack-300 lg:w-[80%]">
                  Studynotion is at the forefront of driving innovation in
                  online education. We're passionate about creating a brighter
                  future by offering cutting-edge courses, leveraging emerging
                  technologies, and nurturing a vibrant learning community.
                </p>
              </div>
              <div className="w-full h-[70px]"></div>
              <div className="grid items-center justify-items-stretch grid-cols-3 gap-5 absolute bottom-0 translate-y-[50%]">
                <img src={aboutus1} className="w-full" alt="" />
                <img src={aboutus2} className="w-full" alt="" />
                <img src={aboutus3} className="w-full" alt="" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-richblack-900 border-b border-richblack-700 md:pt-36">
        <div className="max-w-maxContent mx-auto w-11/12">
          {/* <section className="">
            <h2 className="text-4xl font-semibold text-center text-richblack-5">
              We are passionate about revolutionizing the way we learn. Our
              innovative platform combines <HighlightText text={"technology"} />{" "}
              <HighlightText text={"expertise"} />, and
              <HighlightText text={"community"} />
              to create an
              <HighlightText text={"unparalleled educational experience"} />.
            </h2>
          </section> */}
          <Quote />
        </div>
      </div>

      {/* section 3 ✅ */}
      <section className="bg-richblack-900">
        <div className=" max-w-maxContent mx-auto  py-10 xl:py-28">
          <div className="flex items-center flex-col lg:flex-row justify-between gap-10">
            <div className=" w-full sm:w-10/12 nd:w-1/2 xl:w-[45%] flex flex-col gap-10">
              <h2 className="text-3xl xl:text-4xl font-semibold  text-center md:text-start">
                <h2 className="bg-gradient-to-br from-[#f551df] to-[#ff6a00] text-transparent bg-clip-text font-bold">
                  Out Founding Story
                </h2>
              </h2>
              <p className="text-xl text-richblack-300  text-center md:text-start">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-xl text-richblack-300  text-center md:text-start">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className=" w-full sm:w-10/12 nd:w-1/2 xl:w-[45%] flex relative flex-col gap-10">
              <div className="w-full h-full absolute bottom-[0] left-[50%] translate-x-[-50%] blur-3xl z-[3] bg-richblack-500"></div>
              <img
                src={FoundingStory}
                className="w-full relative z-[5]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="max-w-maxContent mx-auto py-10 xl:py-28">
          <div className="flex items-center flex-col lg:flex-row justify-between gap-10">
            <div className="sm:w-10/12 nd:w-1/2 xl:w-[45%] flex flex-col gap-10">
              <h2 className="text-3xl xl:text-4xl font-semibold  text-center md:text-start">
                <h2 className="bg-gradient-to-br from-[#ff9d2e] to-[#ffe988] text-transparent bg-clip-text font-bold">
                  Our Vision
                </h2>
              </h2>
              <p className="text-xl text-richblack-300  text-center md:text-start">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="sm:w-10/12 nd:w-1/2 xl:w-[45%] flex flex-col gap-10">
              <h2 className="text-3xl xl:text-4xl  font-semibold text-center md:text-start">
                <h2 className="bg-gradient-to-br from-[#4221ff] to-[#90edfd] text-transparent bg-clip-text font-bold">
                  Our Mission
                </h2>
              </h2>
              <p className="text-xl text-richblack-300 text-center md:text-start">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 ✅ */}
      <section className="bg-richblack-800">
        <div className=" max-w-maxContent mx-auto py-10 xl:py-28">
          <div className="flex justify-center items-center flex-col md:flex-row w-full">
            <div className="flex justify-around w-full pb-10 md:py-0">
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-3xl xl:text-4xl font-bold">5K</h2>
                <p className="text-xl text-center text-richblack-300">
                  Active Students
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-3xl xl:text-4xl font-bold">10+</h2>
                <p className="text-xl text-center text-richblack-300">
                  Members
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center w-full pt-10 md:py-0">
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-3xl xl:text-4xl font-bold">200+</h2>
                <p className="text-xl text-center text-richblack-300">
                  Courses
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <h2 className="text-4xl font-bold">50+</h2>
                <p className="text-xl text-center text-richblack-300">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 5 👍 */}
      {/* <section className="bg-richblack-900">
        <div className="max-w-maxContent mx-auto py-10 xl:py-28 ">
          <div className="flex flex-col xl:flex-row items-center xl:place-items-stretch">
            <div className="flex flex-col w-full sm:w-11/12 md:w-11/12 gap-5">
              <div className="flex flex-col items-center xl:items-start gap-4 xl:gap-14 ">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-4xl text-center xl:text-start">World-Class Learning for </h2>
                    <h2 className="text-4xl text-center xl:text-start">
                      <HighlightText text={"Anyone, Anytime and Anywhere"} />
                    </h2>
                  </div>
                  <p className="pr-10 text-xl text-center xl:text-start text-richblack-300">
                    Studynotion partners with more than 275+ leading
                    universities and companies to bring flexible, affordable,
                    job-relevant online learning to individuals and
                    organizations worldwide.
                  </p>
                </div>
                <CtaButton active={true} linkTo={"/signup"}>
                  Learn More
                </CtaButton>
              </div>
              <div className="flex items-end justify-end ">
                <div className=" w-full xl:w-1/2 bg-richblack-700 xl:h-[300px] flex flex-col p-10 gap-10">
                  <h1 className="text-xl font-semibold">Cirtification</h1>
                  <p className="text-richblack-300">
                    You will get a certificate that can be used as a
                    certification during job hunting.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full sm:w-11/12 md:w-11/12">
              <div className="xl:w-1/2 w-full bg-richblack-700 flex flex-col p-10 gap-10 lx:h-[300px]">
                <h1 className="text-xl font-semibold">
                  Curriculum Based on Industry Needs
                </h1>
                <p className=" text-richblack-300">
                  Save time and money! The Belajar curriculum is made to be
                  easier to understand and in line with industry needs.
                </p>
              </div>
              <div className="xl:w-1/2 w-full bg-richblack-700  xl:bg-richblack-800 flex flex-col p-10 gap-10 lx:h-[300px]">
                <h1 className="text-xl font-semibold">Our Learning Methods</h1>
                <p className=" text-richblack-300">
                  The learning process uses the namely online and offline.
                </p>
              </div>
              <div className="xl:w-1/2 w-full bg-richblack-700  xl:bg-richblack-800 flex flex-col p-10 gap-10 lx:h-[300px]">
                <h1 className="text-xl font-semibold">Rating "Auto-grading"</h1>
                <p className=" text-richblack-300">
                  You will immediately get feedback during the learning process
                  without having to wait for an answer or response from the
                  mentor.
                </p>
              </div>
              <div className="xl:w-1/2 w-full bg-richblack-700 flex flex-col p-10 gap-10 lx:h-[300px]">
                <h1 className="text-xl font-semibold">Ready to Work</h1>
                <p className=" text-richblack-300">
                  Connected with over 150+ hiring partners, you will have the
                  opportunity to find a job after graduating from our program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* section 5 🔥 */}
      <section className="bg-richblack-900">
        <div className=" max-w-maxContent mx-auto py-10 xl:py-28">
          <LearningGrid />
        </div>
      </section>

      {/* section 6  */}
      <section className="bg-richblack-900">
        <div className=" max-w-maxContent mx-auto pb-24">
          <ContactFormSection />
        </div>
      </section>

            {/* section 3 */}
            <section className="bg-richblack-900">
        <div className="max-w-maxContent mx-auto px-def">
          <div>
            <h2 className="text-center text-white py-10 text-3xl xl:text-4xl  font-bold">
              Reviews from other learners
            </h2>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
