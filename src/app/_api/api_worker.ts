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
}