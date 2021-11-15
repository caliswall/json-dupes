import { HasHashKey } from "../interfaces/iHashKey";
import { IUrlBase } from "../interfaces/iurl-base";
import { UrlParam } from "./url-param";

export class UrlBase implements IUrlBase, HasHashKey {
  app: string;
  action: string;
  hashKey: string;
  params: any;
  urlParams: UrlParam[];

  constructor(app: string, action: string, params: Array<UrlParam>) {
    this.app = app;
    this.action = action;
    this.urlParams = params;
    this.hashKey = this.setHashKey();
  }

  setHashKey(): string {
    let tempKey = '';

    this.urlParams.sort((a, b) => (a > b ? 1 : -1));
    this.urlParams.forEach(param => {
      tempKey = tempKey + param.name+ '-' + param.value;
    });

    //going to check this for duplicates as the params can appear in any order
    return `${this.app}-${this.action}-${tempKey}`;
  }

}
