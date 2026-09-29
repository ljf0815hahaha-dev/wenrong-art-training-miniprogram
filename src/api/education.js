import { get, post, put } from '@/utils/request'

export const getCampusList = () => get('/education/campus/list')
export const getCourseClassList = (params) => get('/education/course-class/list', params || undefined)
export const getCourseList = (params) => {
  if (typeof params === 'number') return get('/education/course/list', { categoryId: params })
  return get('/education/course/list', params || undefined)
}
export const getCourseDetail = (id) => get('/education/course/detail', { id })
export const getMyCourses = () => get('/education/course/my-list')
export const getCourseOutline = (courseId) => get('/education/course/outline', { courseId })
export const getProgressList = (courseId) => get('/education/course/progress-list', { courseId })
export const updateProgress = (data) => put('/education/course/progress', data)
export const checkIn = (courseId) => post(`/education/course-attendance/check-in?courseId=${encodeURIComponent(courseId)}`)
export const getTodayAttendance = (courseId) => get('/education/course-attendance/today-status', { courseId })
export const getAttendancePage = (params) => get('/education/course-attendance/my-page', params)
export const getStudentProfile = () => get('/education/student-profile/get')
export const saveStudentProfile = (data) => put('/education/student-profile/save', data)
export const getMyNotices = () => get('/education/course-notice/my-list')
export const getCourseGroupBuy = (courseId) => get('/education/course-group-buy/get', { courseId })
