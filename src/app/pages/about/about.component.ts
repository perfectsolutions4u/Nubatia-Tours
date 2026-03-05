import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { Parteners } from '../../shared/components/parteners/parteners.component';
import { RouterModule } from '@angular/router';
import { WhyChooseUs } from "../../shared/components/why-choose-us/why-choose-us.component";
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, CommonModule, Parteners, WhyChooseUs],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  backgroundImage: string = '../../../assets/new_images/banner-morocco-desert-tours.jpg';
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSeoData(
      {},
      'Nubatia Tours - About Us',
      'Learn more about us',
      '../../../assets/image/new-tourism-logo.webp'
    );
  }
}
