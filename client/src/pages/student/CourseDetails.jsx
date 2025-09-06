import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import Youtube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const { allCourses, calculateAverageRating, numberOfLectures, courseDuration, calculateChapterTime, currency } = useContext(AppContext);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(item => item._id === id);
      setCourseData(findCourse);
    }
  }, [id, allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  return (
    <>
    <div className="relative md:px-36 px-6 md:pt-32 pt-20">
      {/* Background Gradient (only half page height) */}
      <div className="absolute top-0 left-0 w-full h-[50vh]  bg-gradient-to-b from-cyan-100/60 to-white"></div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between relative">
        
        {/* LEFT COLUMN: Details */}
        <div className="flex-1 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
            {courseData.courseTitle}
          </h1>

          {/* Description */}
          <p
            className="mt-6 pt-4 text-gray-700 leading-relaxed text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 pb-1 text-sm">
            <p>{calculateAverageRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateAverageRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-4 h-4"
                />
              ))}
            </div>
            <span className="text-blue-600 text-sm md:text-base">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length === 1 ? "review" : "reviews"})
            </span>
            <span>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length === 1 ? "student" : "students"}
            </span>
          </div>

          <p className="text-sm">
            Course By{" "}
            <span className="text-blue-600 text-base underline">Bro Code</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform duration-300 ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      {chapter.chapterContent.length} lectures •{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Lectures List */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 py-1"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 items-center">
                              {lecture.isPreviewFree && (
                                <p onClick={() =>setPlayerData({videoId : lecture.lectureUrl.split("/").pop()})}
                                  className="text-blue-500 cursor-pointer">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="py-20 text-sm md:text-base">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="w-full lg:w-[400px] xl:w-[420px] z-10 shadow-custom-card rounded-t lg:rounded-none overflow-hidden bg-white">
            {
                  playerData ? <Youtube videoId={playerData.videoId} opts={{ playerVars :{ autoplay: 1 } }} iframeClassName='w-full aspect-video'/>
                    : 
                   <img
                      src={courseData.courseThumbnail}
                      alt="course thumbnail"
                    />
              }

          <div className="p-5">
            <div className="flex items-center gap-2">
                 <img
                className="w-4 h-4"
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex flex-wrap items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img
                  src={assets.star}
                  alt="star icon"
                  className="w-4 h-4"
                />
                <p>{calculateAverageRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40 hidden sm:block"></div>

              <div className="flex items-center gap-1">
                <img
                  src={assets.time_clock_icon}
                  alt="clock icon"
                  className="w-4 h-4"
                />
                <p>{courseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40 hidden sm:block"></div>

              <div className="flex items-center gap-1">
                <img
                  src={assets.lesson_icon}
                  alt="lesson icon"
                  className="w-4 h-4"
                />
                <p>{numberOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="w-full py-3 mt-4 text-sm font-semibold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {isAlreadyEnrolled ? "Go to Course" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500 space-y-1">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default CourseDetails;
