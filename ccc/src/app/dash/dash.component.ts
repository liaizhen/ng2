import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero/hero';
import {HeroService} from '../hero/hero.service';
import { HeroSearchComponent } from '../hero/hero-search/hero-search.component'
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  private heroes:Hero[]=[];
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(){
       this.heroService.getHeroes()
       .then(result =>{
         this.heroes = result.slice(0,4);
    })
  }
}
