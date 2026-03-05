import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-why-travel-with-us',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './why-travel-with-us.html',
  styleUrl: './why-travel-with-us.scss',
})
export class WhyTravelWithUs {
  backgroundImage: string = '../../../assets/new_images/banner-morocco-desert-tours.jpg';
  bannerTitle: string = 'Why Travel With Us';
  sanitizer = inject(DomSanitizer);
  whyTravelWithUs: any[] = [
    {
      title: 'Over 35 years of success',
      description: 'Nubatia Tours has been setting standards in the local and regional tourism industry for over six decades, and our years of experience have helped us craft finely-honed tour itineraries that never fail to delight. We’ve trekked and toured every attraction in our destinations many times over and are experts at making your trip as safe, comfortable, and memorable as possible.',
    },
    {
      title: ' Private guided tours',
      description: 'Choose a vacation as unique as you are. Any Nubatia Tours can be custom tailored to meet your wants and needs whether you’re touring the classic attractions or new areas of interest. Our seasoned, knowledgeable professionals are well-equipped with the knowledge to make your private tour a memorable experience that is entirely your own.',
    },
    {
      title: ' We speak your language',
      description: 'You’re reading this page in English, but did you know we also have sites in French, German, Arabic, Russian, Portuguese, Spanish, Italian, Chinese, and Japanese? We guide travelers from all over the world and are dedicated to providing top-tier services in their native languages. Your inquiries, reservation, and tours can all be conducted with multilingual staff.',
    },
    {
      title: 'Solid planning, super flexibility',
      description: 'Nubatia Tours staff and management are focused on bringing you the best trip possible, based on your individual needs and desires. Tour itineraries are carefully planned but easily restructured to the benefit of our travelers.',
    },
    {
      title: 'Safety and security commitment',
      description: 'Our staff make keeping travelers safe a top priority. We’re always in the know while we’re on the go, so we can stay aware of any events that might affect your security and adjust plans accordingly. You’ll be with a staff member at all times during tour hours.',
    },
    {
      title: 'Excellence in service guarantee',
      description: 'Quality is our top priority, and our team of fun and friendly experts are the secret ingredient to an amazing expedition. You’ll be awed by the sights on your itinerary, but it’s our personable and knowledgeable guides that will really help make your experience shine. ',
    },
    {
      title: ' Concern for value and time',
      description: 'We respect that your vacation is an investment of time and money and we want to help you get the most of it. Our local partnerships help us offer tour packages at extremely competitive prices, so you can see more and do more on your trip. ',
    },
    {
      title: 'Around the clock customer care',
      description: 'Our staff are available 24 hours a day, 7 days a week to answer your questions and help you out. We have a toll-free phone line and an instant messaging service available through our website (provide links here), and we’re here day and night to reply to your emails as well. ',
    },
    {
      title: ' Ethical and sustainable tourism',
      description: 'Nubatia Tours is conscious of the impact tourism has on the local environment and economy, and we are committed to making that impact as positive as possible. We aim to operate as environmentally friendly as possible, and work with local businesses to support the Egyptian economy.  We also make a donation to the Magdi Yacoub Heart Foundation for each booking reserved. ',
    },
    {
      title: ' Secure online payment',
      description: 'Your vacation should be stress-free, and that should include the payment. Our system is speedy and secure, and our friendly multilingual staff are here to help. After you’ve reached an agreement with your personal tour consultant, you can make an online payment to Nubatia Tours via credit card (Visa™ or MasterCard™ card are accepted) or bank transfer. Our website uses VeriSign SSL for secure e-commerce and confidential communications.',
    },
  ];



}
