import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MatButton, RouterLink, RouterLinkActive, RouterOutlet]
})
export class AppComponent {
  title = 'spieltag';
}
