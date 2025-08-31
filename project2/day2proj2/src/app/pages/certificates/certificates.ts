import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-certificates',
  imports: [CardModule, BadgeModule, ImageModule, TagModule, GalleriaModule],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class CertificatesComponent {

}
