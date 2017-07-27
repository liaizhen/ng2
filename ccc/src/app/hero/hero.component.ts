import { Component ,OnInit} from '@angular/core';
import { Hero} from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
@Component({
  selector: 'my-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit{
 heroes:Hero[];
 private title = 'My Heroes';
 private selected:Hero;
 constructor(private heroService: HeroService,private router:Router) { }
 ngOnInit(){
   this.getHeroes();
 }
  onSelected(hero:Hero){
    this.selected = hero;
  }
  getHeroes(){
   this.heroService.getHeroes().then(result=>{
      this.heroes = result;
    });
  }
  gotoDetail(){
   this.router.navigate(['/detail',this.selected.id]);
  }
  add(name:string){
      name = name.trim();
      if(!name){
        return ;
      }
      this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selected = null;
      }
      )

  }
  delete(hero:Hero){
    this.heroService.delete(hero.id)
    .then(() => {
      this.heroes = this.heroes.filter(value => value !== hero) ;
      if(this.selected === hero) {
        this.selected = null;
      }
    })
  }
}
