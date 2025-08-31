import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-about',
  imports: [CardModule, TimelineModule, TagModule, DividerModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {

}
