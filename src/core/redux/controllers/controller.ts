import {
  GetItemByIdParams,
  GetItemByIdSuccess,
  HttpClient,
  HttpResponse,
  LayoutRes
} from 'core/entities';

export class Controller {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async getLayout(): Promise<HttpResponse<LayoutRes>> {
    const url = this.url + '?subdomain=supermercado';

    const response = await this.httpClient.request<LayoutRes>({
      url,
      method: 'get'
    });

    return response;
  }

  async getItemById(
    params: GetItemByIdParams
  ): Promise<HttpResponse<GetItemByIdSuccess>> {
    const response = await this.httpClient.request<GetItemByIdSuccess>({
      url: `${this.url}?subdomain=supermercado&slug=${params.slug}`,
      method: 'get'
    });

    return response;
  }
}
