import { Component, OnInit } from '@angular/core';
//获取路由的参数
import { ActivatedRoute, Params }   from '@angular/router';
//返回上级路由
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { HeroService }             from '../hero.service';
import { Hero} from '../hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
 private hero:Hero;
  constructor(
    private heroService:HeroService,
    private route:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit():void {
    this.route.params
    // 提取params参数中的id值，并根据ID值来获取对应额英雄数据
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe((hero) =>  this.hero = hero )
        debugger
  }
  goBack(){
     this.location.back();

      }
  save(){
    this.heroService.update(this.hero)
    .then(() => this.goBack())
  }
}
