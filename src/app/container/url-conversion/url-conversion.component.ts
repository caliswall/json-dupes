import { Component, OnInit } from '@angular/core';
import { Counter } from 'src/app/classes/counter';
import { UrlBase } from '../../classes/url-base';
import { UrlConversionService } from '../../services/url-conversion.service';

@Component({
  selector: 'app-url-conversion',
  templateUrl: './url-conversion.component.html',
  styleUrls: ['./url-conversion.component.scss']
})
export class UrlConversionComponent implements OnInit {
  rawUrlBase: Array<UrlBase> = [];
  duplicateArray: {base: UrlBase, count: number}[]  = [];
  constructor(private urlConversionService: UrlConversionService) { }

  ngOnInit(): void {
    this.rawUrlBase = this.urlConversionService.getUrlJson();
    //console.log(this.rawUrlBase);
    this.findDuplicates();
  }

  findDuplicates() {
    let byHashKey = new Counter(this.rawUrlBase, (base: UrlBase) => base.hashKey);
    for (let [key, value] of byHashKey) {
      if (value > 1) {
        const base = this.rawUrlBase.filter(base => base.hashKey === key)[0];
        this.duplicateArray.push({base, count: value});
      }
    }
    //console.log(this.duplicateArray);
  }
}
