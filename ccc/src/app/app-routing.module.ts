import { NgModule }       from '@angular/core';
import { RouterModule,Routes}   from '@angular/router';


import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroComponent }     from './hero/hero.component';
import { DashComponent } from './dash/dash.component';

const router:Routes = [
   {
        path: '',
        redirectTo: '/dash',
        pathMatch: 'full'
      },
      {
        path:'heroes',
        component: HeroComponent
      },
      {
        path:'dash',
        component: DashComponent
      },
       {
        path:'detail/:id',
        component: HeroDetailComponent
      }
];
@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
 exports: [
   RouterModule
 ]
})
export class AppRoutingModule {
 
}