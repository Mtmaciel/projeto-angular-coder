import { Component } from '@angular/core';
import { templateSourceUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent {
  nome = 'Maria';
}
