import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-skills',
  imports: [FormsModule, ProgressBarModule, RatingModule, ChipModule, CardModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent {

}
