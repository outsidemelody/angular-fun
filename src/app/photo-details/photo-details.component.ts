import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsComponent {

}
