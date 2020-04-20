import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', children: [
        { path: '', pathMatch: 'full', redirectTo: 'introduction' },
        // Intro
        { path: 'introduction', loadChildren: './introduction/config.module#ConfigModule' },
      ] },
    ]),
  ],
})
export class ExamplesModule { }
