import axios from 'axios';
import {sha1} from 'js-sha1'
import dotenv from 'dotenv'
import { APIUrls } from './url';


export class ApiWorker {

  private static async hashPassword(password: string) {
    return sha1(password);
  }
  
  public static async sayHello() {
    const response = await axios.get(APIUrls.BASE_URL);
    return response.data;
  }

  //ADMIN API
  public static async admin_login(username: string, password: string) {
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
  }

  public static async viewStaff(token: string) {
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
  }

  //TODO: Add staff
  public static async addStaff(token: string, data: any) {
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
  }

  public static async editStaff(token: string, data: any) {
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
  }

  //STAFF SECTION
  public static async staff_login(username: string, password: string) {
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
  }

  public static async getStudentsByClass(token: string, data: any) {
    const options = {
      method: 'POST',
      url: APIUrls.STAFF_GET_STUDENTS_BY_CLASS,
      headers: {
        Authorization: 'Bearer '+token,
        'content-type': 'application/json'
      },
      data: data
    };
    const response = await axios.request(options);
    return response;
  }

  public static async getStudentById(token: string, data: any) {
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
  }


  //STUDENT SECTION
  public static async student_login(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const register_no = username;
    const data = {
      "register_no": username,
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
  }

  public static async view_student_details(token: string) {
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
  }

  public static async view_remaining_assignment(token: string) {
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
  }

  public static async view_completed_assignment(token: string) {
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
  }

  public static async view_schedule(token: string) {
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
  }
}