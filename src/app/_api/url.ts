export class APIUrls {
  public static readonly BASE_URL = 'http://localhost:3600';

	//ADMIN
  	public static readonly ADMIN_BASE_URL = `${APIUrls.BASE_URL}/admin`;

  	public static readonly ADMIN_LOGIN = `${APIUrls.ADMIN_BASE_URL}/login`;
  	public static readonly ADMIN_SIGNUP = `${APIUrls.ADMIN_BASE_URL}/signup`;

	public static readonly ADMIN_ADD_STAFF = `${APIUrls.ADMIN_BASE_URL}/addStaff`;
	public static readonly ADMIN_VIEW_STAFF = `${APIUrls.ADMIN_BASE_URL}/viewStaff`;
	public static readonly ADMIN_EDIT_STAFF = `${APIUrls.ADMIN_BASE_URL}/editStaff`;
	public static readonly ADMIN_VIEW_STAFF_ADVISOR = `${APIUrls.ADMIN_BASE_URL}/viewStaffAdvisor`;

	public static readonly ADMIN_DELETE_CLASS = `${APIUrls.ADMIN_BASE_URL}/deleteClass`;

	//STAFF
	public static readonly STAFF_BASE_URL = `${APIUrls.BASE_URL}/staff`;
	public static readonly STAFF_LOGIN = `${APIUrls.STAFF_BASE_URL}/login`;

	public static readonly STAFF_GET_STUDENTS_BY_CLASS = `${APIUrls.STAFF_BASE_URL}/getStudentByClass`;
	public static readonly STAFF_GET_STUDENT_BY_ID = `${APIUrls.STAFF_BASE_URL}/getStudentById`;
	public static readonly STAFF_ADD_STUDENT = `${APIUrls.STAFF_BASE_URL}/addStudent`;
	public static readonly STAFF_DELETE_STUDENT = `${APIUrls.STAFF_BASE_URL}/deleteStudent`;
	public static readonly STAFF_UPDATE_STUDENT = `${APIUrls.STAFF_BASE_URL}/updateStudent`;

	public static readonly STAFF_VIEW_SCHEDULE = `${APIUrls.STAFF_BASE_URL}/viewSchedule`;
	public static readonly STAFF_ADD_SCHEDULE = `${APIUrls.STAFF_BASE_URL}/addSchedule`;

	public static readonly STAFF_CHECK_ATTENDANCE = `${APIUrls.STAFF_BASE_URL}/checkAttendance`;
	public static readonly STAFF_GET_ATTENDANCE = `${APIUrls.STAFF_BASE_URL}/getAttendance`;
	public static readonly STAFF_UPDATE_ATTENDANCE = `${APIUrls.STAFF_BASE_URL}/updateAttendance`;

	public static readonly STAFF_GIVE_ASSIGNMENT = `${APIUrls.STAFF_BASE_URL}/giveAssignment`;
	public static readonly STAFF_GET_ASSIGNMENT_BY_CLASS = `${APIUrls.STAFF_BASE_URL}/getAssignmentByClass`;
	public static readonly STAFF_DELETE_ASSIGNMENT = `${APIUrls.STAFF_BASE_URL}/deleteAssignment`;
	public static readonly STAFF_MARK_ASSIGNMENT = `${APIUrls.STAFF_BASE_URL}/markAssignment`;
	public static readonly STAFF_GET_MARKS = `${APIUrls.STAFF_BASE_URL}/getMarks`;
	
	public static readonly STAFF_SHOW_CLASSES = `${APIUrls.STAFF_BASE_URL}/showClasses`;

	public static readonly STAFF_CHANGE_PASSWORD = `${APIUrls.STAFF_BASE_URL}/changePassword`;

	//STUDENT
	public static readonly STUDENT_BASE_URL = `${APIUrls.BASE_URL}/student`;
	public static readonly STUDENT_LOGIN = `${APIUrls.STUDENT_BASE_URL}/login`;

	public static readonly STUDENT_VIEW_ATTENDANCE = `${APIUrls.STUDENT_BASE_URL}/viewAttendance`;
	public static readonly STUDENT_VIEW_SCHEDULE = `${APIUrls.STUDENT_BASE_URL}/viewSchedule`;

	public static readonly STUDENT_VIEW_ASSIGNMENT_WITH_MARKS = `${APIUrls.STUDENT_BASE_URL}/viewAssignmentWithMarks`;
	public static readonly STUDENT_VIEW_REMAINING_ASSIGNMENT = `${APIUrls.STUDENT_BASE_URL}/viewRemainingAssignment`; 

	public static readonly STUDENT_VIEW_STUDENTS = `${APIUrls.STUDENT_BASE_URL}/viewStudents`; // WHAT!!!!!!!!
	public static readonly STUDENT_VIEW_STUDENT_DETAILS = `${APIUrls.STUDENT_BASE_URL}/viewStudentDetails`;

	public static readonly STUDENT_CHANGE_PASSWORD = `${APIUrls.STUDENT_BASE_URL}/changePassword`;

}