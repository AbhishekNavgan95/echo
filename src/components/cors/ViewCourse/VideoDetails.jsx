import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";
import ActionButton from '../../common/ActionButton';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  console.log("course id: ", courseId);
  console.log("section id : ", sectionId);
  console.log("subSectionId : ", subSectionId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector(state => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    completedLectures
  } = useSelector(state => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const setVideoSpecificDetails = async () => {
      if (!courseSectionData)
        return;

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {

        const filteredData = courseSectionData.filter((section) => section._id === sectionId);
        const filteredVideoData = filteredData[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        )

        console.log("filteredData : ", filteredData)
        console.log("filteredVideoData : ", filteredVideoData)

        setVideoData(filteredVideoData[0]);
        // setVideoData(false);

      }

    }
    setVideoSpecificDetails();

  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      data => data._id == subSectionId
    )

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }

  }

  const isLastVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      data => data._id == subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1
      && currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    } else {
      return false;
    }
  }

  const goToNextVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      data => data._id == subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id;
      // go to next video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const firstSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`)
    }

  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(data => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSectionId?.findIndex(
      data => data._id === subSectionId
    )

    if (currentSubSectionIndex != 0) {

      const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSectionIndex - 1]
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);

    } else {

      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection?.length
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }

  }

  const handleLectureCompletion = async () => {
    // to do dummy code
    setLoading(true);

    // const res = await markLectureAsComplete({courseId, subSectionId}, token)
    // update state
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false);

  }

  return (
    <div className='w-full'>
      {
        !videoData
          ? <div>No data found</div>
          : <div className='w-full h-full border rounded-lg overflow-hidden border-richblack-600'>
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >

              {
                videoEnded && <div>
                  {
                    !completedLectures.includes(subSectionId) &&
                    <ActionButton
                    disabled={loading}
                      onClick={() => handleLectureCompletion()}
                    >{
                        !loading ? "Mark as completed" : "Loading"
                      }</ActionButton>
                  }

                  <ActionButton
                    disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef.current?.seek[0]
                      }
                      videoEnded(false);
                    }}
                  >
                    {
                      !loading ? "Rewatch" : "Loading"
                    }
                  </ActionButton>
                  <div>
                    {
                      !isFirstVideo() && 
                      <ActionButton
                        active={false}
                        disabled={loading}
                        onClick={goToPrevVideo}
                      >
                        Prev
                      </ActionButton>
                    }
                    {
                      !isLastVideo &&
                      <ActionButton
                        active={true}
                        disabled={loading}
                        onClick={goToNextVideo}
                      >
                        Next
                      </ActionButton>
                    }
                  </div>
                </div>
              }
            </Player>
          </div>
      }
      <div className='mt-4'>
        <h4 className='text-2xl font-semibold'>{videoData.title}</h4>
        <p className='text-richblack-300'>{videoData.description}</p>
      </div>
    </div>
  )
}

export default VideoDetails