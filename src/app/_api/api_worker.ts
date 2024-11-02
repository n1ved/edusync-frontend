import axios from 'axios';
import { APIUrls } from './url';


export class ApiWorker {
  public static async sayHello() {
    const response = await axios.get(APIUrls.BASE_URL);
    return response.data;
  }
}