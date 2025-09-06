import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {

  const { enrolledCourses, courseDuration, navigate } = useContext(AppContext);

  const [progress, setProgress] = React.useState([
    {lectureCompleted: 2, totalLectures: 10 },
    {lectureCompleted: 5, totalLectures: 20 },
    {lectureCompleted: 0, totalLectures: 10 },
    {lectureCompleted: 0, totalLectures: 10 },
    {lectureCompleted: 2, totalLectures: 4},
    {lectureCompleted: 1, totalLectures: 5},
    {lectureCompleted: 3, totalLectures: 6},
    {lectureCompleted: 4, totalLectures: 4},
    {lectureCompleted: 0, totalLectures: 3},
    {lectureCompleted: 5, totalLectures: 7},
    {lectureCompleted: 6, totalLectures: 8},
    {lectureCompleted: 2, totalLectures: 6},
    {lectureCompleted: 4, totalLectures: 10},
    {lectureCompleted: 3, totalLectures: 5},
    {lectureCompleted: 7, totalLectures: 7},
    {lectureCompleted: 1, totalLectures: 4},
    {lectureCompleted: 0, totalLectures: 2},
    {lectureCompleted: 5, totalLectures: 5}

  ]);

  return (
<>
  <div className="md:px-36 px-8 pt-10">
    <h1 className="text-2xl font-semibold">My Enrollments</h1>

    <div className="overflow-x-auto mt-10">
      <table className="table-auto w-full border-collapse border rounded-lg shadow-sm">
        {/* Table Head (hidden on small screens) */}
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left hidden sm:table-header-group">
          <tr>
            <th className="px-4 py-3 font-semibold truncate">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Completed</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>

      <tbody className="text-gray-700">
        {enrolledCourses.map((course, index) => (
          <tr
            key={index}
            className="border-b border-gray-500/20 hover:bg-gray-50 text-sm sm:text-base"
          >
            {/* Course Info */}
            <td className="md:px-4 p1-2 md:p1-4 py-3 flex items-center space-x-3">
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-14 sm:w-24 md:w-28"
              />
              <div className='flex-1'>
                <p className="mb-1 max-sm:text-sm font-medium text-gray-800">{course.courseTitle}</p>
                <Line percent={progress[index]?.lectureCompleted / progress[index]?.totalLectures * 100} strokeWidth={2} strokeColor="#3b82f6" />
              </div>
            </td>

            {/* Duration */}
            <td className="px-4 py-3 max-sm:hidden text-gray-600">
              {courseDuration(course)}
            </td>

            {/* Completed Lectures */}
            <td className="px-4 py-3 max-sm:hidden text-gray-600">
            {progress[index] && `${progress[index].
                lectureCompleted} / ${progress[index].totalLectures}`}
              <span className="text-gray-400">Lectures</span>
            </td>

            {/* Status */}
            <td className="px-4 py-3 max-sm:text-right">
              <button onClick={() => navigate(`/player/${course._id}`)} className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm rounded-full bg-blue-100 text-blue-600 max-sm:text-xs hover:bg-blue-200 ">
               {progress[index] && progress[index].lectureCompleted /
               progress[index].totalLectures === 1? 'Completed' : 'On Going'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      </table>
    </div>
      </div>
      <Footer />
</>

  )
}

export default MyEnrollments
