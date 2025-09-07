import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import {useAuth, useUser} from "@clerk/clerk-react"

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const { getToken } = useAuth()
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    }

  
  // function to calc average rating of course
  const calculateAverageRating = (course) => {
  
    if (course.courseRatings.length === 0) return 0;
    let total = 0;
    course.courseRatings.forEach((review) => total += review.rating);
    return total / course.courseRatings.length;
  };

  // function to calc course chap time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => time += lecture.duration);

    return humanizeDuration(time  * 60 * 1000, {units : ['h', 'm']});
  };

  // function to calc course duration
  const courseDuration = (course) => {

    let time = 0;
    course.courseContent.map((chapter) => {
      chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
    });
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  };

  // function to calc n0. of lecture in course
  const numberOfLectures = (course) => {
    let count = 0;
    course.courseContent.forEach((chapter) => {
      if(Array.isArray(chapter.chapterContent)) {
        count += chapter.chapterContent.length;
      }
    });
    return count;
  };

  //Fetch user Enrolled Courses
  const fetchEnrolledCourses = async () => {
    // Simulate an API call
    setEnrolledCourses(dummyCourses);
  };

  // Load dummy courses initially
  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  }, []);

  const logToken = async () => {
    console.log(await getToken());
  }
  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user])

  const value = {
    currency,
    allCourses,
    navigate, isEducator, setIsEducator,
    calculateAverageRating, numberOfLectures, courseDuration, calculateChapterTime,
    enrolledCourses, fetchEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
