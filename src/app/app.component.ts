import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  links = [{ name: 'Photos', path: '' }, { name: 'Favorites', path: 'favorites' }];
  activeLink = this.links[0].path;

  constructor() {
  }

}
