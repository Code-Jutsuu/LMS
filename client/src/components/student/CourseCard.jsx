import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'  // make sure you have this file
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateAverageRating } = useContext(AppContext)

  // Calculate final price after discount
  const finalPrice = (course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)

  return (
    <Link to={`/course/${course._id}`} onClick={() => window.scrollTo(0, 0)} className="'border border-gray-500/30 pb-6 overflow-hidden rounded-lg'">
      {/* Thumbnail */}
      <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full " />

      {/* Content */}
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold text-gray-800">{course.courseTitle}</h3>
        <p className=" text-gray-500">By Bro code</p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">4.5</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateAverageRating(course)) ? assets.star : assets.star_blank} alt="star" className="w-3.5 h-3.5" />
            ))}
          </div>
          <p className=" text-gray-400 ">{course.courseRatings.length}</p>
        </div>

        {/* Price */}
        <p className="text-gray-800text-base font-semibold mt-3">
          {currency}{finalPrice}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard
