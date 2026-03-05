import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-travel-with-us',
  imports: [CommonModule],
  templateUrl: './why-travel-with-us.html',
  styleUrl: './why-travel-with-us.scss',
})
export class WhyTravelWithUS {
  features: any[] = [];
  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.features = [
      {
        icon: 'fa fa-gear',
        title: '100% Tailor made',
        description: [
          'Your entire vacation is designed around your requirements',
          'Explore your interests at your own speed',
          'Select your preferred style of accommodations',
          'Create the perfect trip with the help of our specialists',
        ],
      },
      {
        icon: 'fa-regular fa-lightbulb',
        title: 'Expert knowledge',
        description: [
          'All our specialists have traveled extensively or lived in their specialist regions, We\'re with you every step of the way',
          'The same specialist will handle your trip from start to finish',
          'Make the most of your time and budget',
        ],
      },
      {
        icon: 'fa fa-user-tie',
        title: 'The best guides',
        description: [
          'Make the difference between a good trip and an outstanding one',
          'Our leaders will be there to ensure your safety and wellbeing is the number one priority',
          'Offering more than just dates and names, they strive to offer real insight into their country',
        ],
      },
      {
        icon: 'fa fa-shield',
        title: 'Fully protected',
        description: ['Secure Payment - Use your debit card or credit card. Your transactions are protected by 3D Secure and SecureCode.'],
        image1: '../../../../assets/new_images/cybersource.png',
        image2: '../../../../assets/new_images/mpgs.webp',
      },
    ];
  } 
}
