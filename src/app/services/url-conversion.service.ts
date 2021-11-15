import { Injectable } from '@angular/core';
import { UrlBase } from '../classes/url-base';
import { UrlParam } from '../classes/url-param';
import { IUrlBase } from '../interfaces/iurl-base';
import ItemsJson from '../json/items.json';

@Injectable({
  providedIn: 'root'
})
export class UrlConversionService {

  constructor() { }

  public getUrlJson(): Array<UrlBase> {
    let jsonString = JSON.stringify(ItemsJson);
    let iurlBases: Array<IUrlBase> = JSON.parse(jsonString);
    return this.addHashKeyToBases(iurlBases);
  }

  private addHashKeyToBases(iurlBases: Array<IUrlBase>): Array<UrlBase> {
    let hashKeyedBases: Array<UrlBase> = []
    iurlBases.forEach(x => {
      let array: Array<UrlParam> = [];
      for (const [key, value] of Object.entries(x.params)) {
        const urlParams = new UrlParam(key, value);
        array.push(urlParams);
      };
      const base = new UrlBase(x.app, x.action, array);
      hashKeyedBases.push(base);
    });
    return hashKeyedBases;
  }
}
