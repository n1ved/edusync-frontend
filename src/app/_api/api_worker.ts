import axios from 'axios';
import {sha1} from 'js-sha1'
import dotenv from 'dotenv'
import { APIUrls } from './url';
import { url } from 'inspector';
import { headers } from 'next/headers';


export class ApiWorker {

  private static async hashPassword(password: string) {
    return sha1(password);
  }
  
  private static async handleResponse(response: any) {
    if (response.status === 200) {
      return response.data;
    } else {
      alert("Error: "+response.data.message);
    }
  }

  public static async sayHello() {
    const response = await axios.get(APIUrls.BASE_URL);
    return response.data;
  }

  //ADMIN API
  public static async admin_login(username: string, password: string) {
    try{
      const hashedPassword = await this.hashPassword(password);
      const data = {
        "username": username,
        "password": hashedPassword,
      };
      const options = {
        method: 'POST',
        url: APIUrls.ADMIN_LOGIN,
        headers: {
          Authorization: 'Bearer '+process.env.JWT_SECRET,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async viewStaff(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.ADMIN_VIEW_STAFF,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        }
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async viewStaffAdvisor(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.ADMIN_VIEW_STAFF_ADVISOR,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        }
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async addStaff(token: string, data: any) {
    try{
      data.password = await sha1(data.password);
      const options = {
        method: 'POST',
        url: APIUrls.ADMIN_ADD_STAFF,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async editStaff(token: string, data: any) {
   try{
    const options = {
      method: 'PUT',
      url: APIUrls.ADMIN_EDIT_STAFF,
      headers: {
        Authorization: 'Bearer '+token,
        'content-type': 'application/json'
      },
      data: data
    };
    const response = axios.request(options);
    return response;
   }catch(e){
     alert(e);
   }
  }

  public static async showClasses(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.ADMIN_SHOW_CLASSES,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        }
      };
      const response = axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }
  //STAFF SECTION
  public static async staff_login(username: string, password: string) {
    try{
      const hashedPassword = await this.hashPassword(password);
      const data = {
        "name": username,
        "password": hashedPassword,
      };
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_LOGIN,
        headers: {
          Authorization: 'Bearer '+process.env.JWT_SECRET,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_self_details(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_SELF_DETAILS,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        }
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      console.log(e);
    }
  }

  public static async staff_view_schedule(token: string,className : string) {
    try{
      const data = {
        className: className
      };
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_VIEW_SCHEDULE+"/"+className,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_view_students(token: string,className : string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_GET_STUDENTS_BY_CLASS+"/"+className,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_show_classes(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_SHOW_CLASSES,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_show_courses(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_SHOW_COURSES,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_check_attendance(token:string,data:any){
    try{
      const options = {
        method : 'POST',
        url : APIUrls.STAFF_CHECK_ATTENDANCE,
        headers : {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data : data
      }
      const response = await axios.request(options);
      if(response.status === 200){
        return response;
      }
    }catch(e){
      alert(e);
    }
  }

  public static async staff_update_attendance(token:string,data:any){
    try{
      const options = {
        method : 'PUT',
        url : APIUrls.STAFF_UPDATE_ATTENDANCE,
        headers : {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data : data
      }
      const response = await axios.request(options);
      if(response.status === 200){
        return response;
      }
    }catch(e){
      alert(e);
    }
  }

  public static async getStudentById(token: string, data: any) {
    try{
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_GET_STUDENT_BY_ID,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async add_student(token: string, data: any) {
    try{
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_ADD_STUDENT,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async delete_student(token:string , data:any){
    try{
      const options = {
        method : 'DELETE',
        url : APIUrls.STAFF_DELETE_STUDENT,
        headers: {
           Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      }
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_get_assignment_by_class(token: string, className: any) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STAFF_GET_ASSIGNMENT_BY_CLASS+"/"+className,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_give_assignment(token: string, data: any) {
    try{
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_GIVE_ASSIGNMENT,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){  
      alert(e);
    }
  }

  public static async staff_add_schedule(token: string, data: any) {
    try{
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_ADD_SCHEDULE,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_delete_schedule(token: string, data: any) {
    try{
      const options = {
        method: 'DELETE',
        url: APIUrls.STAFF_DELETE_SCHEDULE,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async staff_mark_assignment(token: string, data: any) {
    try{
      const options = {
        method: 'POST',
        url: APIUrls.STAFF_MARK_ASSIGNMENT,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }



  //STUDENT SECTION
  public static async student_login(username: string, password: string) {
    try{
      const hashedPassword = await this.hashPassword(password);
      const register_no = username;
      const data = {
        "register_no": register_no,
        "password": hashedPassword,
      };
      const options = {
        method: 'POST',
        url: APIUrls.STUDENT_LOGIN,
        headers: {
          Authorization: 'Bearer '+process.env.JWT_SECRET,
          'content-type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async view_student_details(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STUDENT_DETAILS,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async view_remaining_assignment(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STUDENT_VIEW_REMAINING_ASSIGNMENT,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async view_completed_assignment(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STUDENT_VIEW_ASSIGNMENT_WITH_MARKS,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async view_schedule(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STUDENT_VIEW_SCHEDULE,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      };
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }

  public static async view_attendance(token: string) {
    try{
      const options = {
        method: 'GET',
        url: APIUrls.STUDENT_VIEW_ATTENDANCE,
        headers: {
          Authorization: 'Bearer '+token,
          'content-type': 'application/json'
        },
      }
      const response = await axios.request(options);
      return response;
    }catch(e){
      alert(e);
    }
  }
}