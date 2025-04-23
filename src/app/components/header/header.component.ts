import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormatPipe } from '../../pipes/format.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormatPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'tp01_ANGULAR_ePsi';
}
