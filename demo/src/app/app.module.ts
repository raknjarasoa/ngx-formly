import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    LoadingBarRouterModule,
    RouterModule.forRoot([
      { path: 'examples', loadChildren: './examples/examples.module#ExamplesModule' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
