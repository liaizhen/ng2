import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http,Headers } from '@angular/http';
import {Hero} from './hero';
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) { }
  
   getHeroes(): Promise<Hero[]> {
    //  toPromise()变成promise对象
  
     return this.http.get(this.heroesUrl)
     .toPromise()
     .then(response => 
       response.json().data as Hero[] )
      .catch(this.handleError)
      
   }
  getHero(id:number) {
    // 根据id来获取单个英雄
    return this.http.get(`${this.heroesUrl}/${id}`)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError)
    }
   
    update(hero:Hero):Promise<Hero>{
     const heroUrl = `${this.heroesUrl}/${hero.id}`;
     return this.http
                .put(heroUrl,JSON.stringify(hero),{headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError)
    }
     create(name:string):Promise<Hero>{
       return this.http
                  .post(this.heroesUrl,JSON.stringify({name:name}),{headers:this.headers})
                  .toPromise()
                  .then(res => res.json().data as Hero)
                  .catch(this.handleError)
     }
    delete(id:number):Promise<void>{
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete(url,{ headers: this.headers })
               .toPromise()
               .then(() => null)
               .catch(this.handleError)
    }
    private handleError(err:any):Promise <any>{
      console.log('An error occurred',err);
      return Promise.reject(err.message || err);
   }
}
