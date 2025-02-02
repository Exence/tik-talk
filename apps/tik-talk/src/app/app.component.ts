import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ProfileCardComponent } from '@tt/profiles';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
})
export class AppComponent {}
