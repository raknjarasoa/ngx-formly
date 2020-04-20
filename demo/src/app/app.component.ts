import { Component } from '@angular/core';

@Component({
  selector: 'formly-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menu = [
    {
      path: 'examples',
      title: 'Examples',
      links: [
        { title: 'Intro' },
        { path: '/examples/introduction', title: 'Introduction Example' },
      ],
    },
  ];

  links = this.menu[0].links.filter(x => x.path);
}


