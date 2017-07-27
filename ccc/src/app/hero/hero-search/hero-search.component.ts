import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../hero-search.service';
import {Hero} from '../hero';
@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers:[HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes:Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroSearchService:HeroSearchService,
    private router:Router
  ) { }
 search(term:string){
      this.searchTerms.next(term);
  }
  ngOnInit() {
    this.heroes = this.searchTerms
    .debounceTime(300) //等待300ms显示结果
    .distinctUntilChanged() //忽略输入相同的字符
    .switchMap(term => term?this.heroSearchService.search(term):Observable.of<Hero[]>([]))
    .catch(err => {
      console.log(err);
      return Observable.of<Hero[]>([]);
    })
  }
 gotoDetail(hero:Hero){
   let link = ['/detail',hero.id];
   this.router.navigate(link);
 } 
}
