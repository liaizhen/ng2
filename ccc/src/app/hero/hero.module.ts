
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
// import { HeroSearchComponent } from './hero-search/hero-search.component';
import {HeroSearchService} from './hero-search.service'

@NgModule({
  declarations: [
    HeroDetailComponent,
    // HeroSearchComponent,
  ],
  imports: [
    FormsModule
  ],
  providers: [HeroSearchService]
})
export class HeroModule { 
   
}
