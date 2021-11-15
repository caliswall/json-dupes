import { UrlParam } from "../classes/url-param";

export interface IUrlBase {
  app: string;
  action: string;
  params: Record<string, string>;
  urlParams: Array<UrlParam>;
}
