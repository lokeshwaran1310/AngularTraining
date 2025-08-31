import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-experience',
  imports: [TimelineModule, CardModule, PanelModule, TagModule, DividerModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent {

}
