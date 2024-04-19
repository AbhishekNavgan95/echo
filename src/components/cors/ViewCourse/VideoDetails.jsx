import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player'
import ActionButton from '../../common/ActionButton';

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector(state => state.auth);
  const {
    courseSectionData,
    courseEntireData,
    completedLectures
  } = useSelector(state => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(true);
  const [loading, setLoading] = useState(false);

  const setVideoSpecificDetails = async () => {
    if (!courseSectionData)
      return;

    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {

      const filteredData = courseSectionData.filter((section) => section._id === sectionId);
      const filteredSubsection = filteredData[0]?.subSection?.filter(
        (subSection) => subSection._id === subSectionId
      )

      if (filteredSubsection) {
        setVideoData(filteredSubsection[0]);
      }
      setVideoEnded(false)
    }
  }

  useEffect(() => {
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

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      data => data._id === subSectionId
    )

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]?._id
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

    const res = await markLectureAsComplete({ courseId, subSectionId }, token)
    // update state
    if (res) {
      dispatch(setCompletedLectures(res?.completedVideos))
    }

    setLoading(false);

  }

  return (
    <div className='w-full'>
      {
        !videoData
          ? <div className='text-center text-xl'>No data found</div>
          : <div className='w-full h-full flex flex-col gap-3'>
            <div className='flex gap-3 justify-end'>
              {
                !completedLectures?.includes(subSectionId) &&

                <ActionButton
                  disabled={loading}
                  active
                  onClick={() => handleLectureCompletion()}
                >{
                    !loading ? "Mark as completed" : "Loading"
                  }</ActionButton>
              }
            </div>
            <div className=' border rounded-lg overflow-hidden border-richblack-600'>
              <ReactPlayer
                controls
                onEnded={() => setVideoEnded(true)}
                width="100%"
                height="100%"
                url={videoData?.videoUrl}
              />
            </div>

            {
              videoEnded &&
              <div className='flex justify-start gap-3'>
                {
                  !isFirstVideo() &&
                  <ActionButton
                    active={false}
                    disabled={loading}
                    onClick={goToPrevVideo}
                  >
                    Previous
                  </ActionButton>
                }
                {
                  !isLastVideo() &&
                  <ActionButton
                    active={true}
                    disabled={loading}
                    onClick={goToNextVideo}
                  >
                    Next
                  </ActionButton>

                }
              </div>
            }
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