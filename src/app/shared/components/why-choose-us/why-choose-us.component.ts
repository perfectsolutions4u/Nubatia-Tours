import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss',
})
export class WhyChooseUs implements OnInit {
  features: any[] = [];

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    // You can customize this to fetch features from your API
    // For now, using a placeholder structure
    this.features = [
      {
        class: 'bg-primary',
        icon: 'fa fa-user-tie',
        title: 'Expert Egyptologists',
        description: 'Our certified Egyptologist guides bring ancient history to life with deep knowledge and passionate storytelling, ensuring an educational and immersive experience.',
      },
      {
        class: 'bg-warning',
        icon: 'fa fa-shield',
        title: 'Safety & Security',
        description: 'Your safety is our priority. We maintain the highest safety standards with 24/7 support, modern vehicles, and comprehensive safety protocols.',
      },
      {
        class: 'bg-success',
        icon: 'fa-regular fa-star',
        title: 'Luxury Experience',
        description: 'From premium accommodations to exclusive access, we provide luxury experiences that exceed expectations and create unforgettable memories.',
      },
      {
        class: 'bg-danger',
        icon: 'fa fa-headset',
        title: 'Personalized Service',
        description: 'Every journey is tailored to your preferences with dedicated support from planning to departure, ensuring a seamless and personalized experience.',
      },
    ];
  }
}
