import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpRequest, HttpResponse } from 'core/entities';

export class ApiClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        params: data.params
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data ?? axiosResponse
    };
  }
}
