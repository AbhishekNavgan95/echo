import React from "react";
import HighlightText from "../../common/HighlightText";
import CtaButton from "../../common/CtaButton";

const LearningGrid = () => {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, ob-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

  return (
    <div className="grid mx-auto md:w-11/12 xl:w-full sn:grid-cols-1 xl:grid-cols-4 mb-10">
      {LearningGridArray.map((grid, index) => {
        return (
          <div
            key={index}
            className={`
                ${grid.order < 0 && "lg:col-span-2 bg-richblack-900"}
                ${
                  grid.order % 2 === 1 && grid.order > 0
                    ? "bg-richblack-700"
                    : "bg-richblack-800"
                }
                ${grid.order === 3 && "lg:col-start-2"}
                xl:min-h-[300px]
            `}
          >
            {grid.order < 0 ? (
              <div className="flex flex-col items-start p-5 md:p-10 gap-4">
                <h2 className="text-3xl xl:text-4xl ">
                  {grid.heading} <HighlightText text={grid.highlightText} />
                </h2>
                <p className="text-xl text-richblack-300">{grid.description}</p>
                <CtaButton active={true} linkTo={grid.BtnLink}>
                  {grid.BtnText}
                </CtaButton>
              </div>
            ) : (
              <div className="p-5 md:p-10  flex flex-col gap-5">
                <h2 className="text-2xl text-semibold">{grid.heading}</h2>
                <p className="text-xl text-richblack-300">{grid.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
