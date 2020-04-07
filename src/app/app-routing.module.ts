import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicroblinkComponent } from './microblink/microblink.component';


const routes: Routes = [
  {
    path: '', component: MicroblinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
