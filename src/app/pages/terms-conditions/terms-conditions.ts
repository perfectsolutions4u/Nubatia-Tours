import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss',
})
export class TermsConditions {
  backgroundImage: string = '../../../assets/new_images/banner-morocco-desert-tours.jpg';
  bannerTitle: string = 'Terms and Conditions';
  sanitizer = inject(DomSanitizer);

  termsConditions: string = `
    <p class="section-title">Cancellation</p>
    <p>Cancellation requests should be sent via fax or emailed to provide the Company with written confirmation that your reservation should be cancelled. In case you cancel your trip, the following scale of charges will be applied:</p>
    <ul>
      <li>25% from the total due amount will be charged From the Date of Booking till 180 Days Prior of the trip date.</li>
      <li>50% from the total due amount will be charged for cancellations 180-120 days prior to embarkation date.</li>
      <li>75% from the total due amount will be charged for cancellations 120-60 days prior to embarkation date.</li>
      <li>100% of the total stay will be charged for cancellations less than 60 days prior to embarkation date.</li>
      <li>In case of no show, full amount will be charged as cancellation fees.</li>
    </ul>
    <p>For any Cancellation:</p>
    <ul>
      <li>6% of the deposit paid will be charged as a bank transaction fee.</li>
    </ul>
    <p>Additionally, there are cancellation fees on all domestic flights within Egypt. If you cancel a tour at any time, you will be subject to any fees according to airline's cancellation.</p>

    <p class="section-title">Refunds</p>
    <p>A refund will normally be made to the same account and using the same method used for the original payment within a maximum period of 14 working days. No refunds are possible in the event of a no show for an existing reservation.</p>

    <p class="section-title">Accommodation</p>
    <p>Unless otherwise stated, prices are based on two persons sharing a room (twin sharing). Rooms for single occupants are available with an additional of supplementary rate. Hotels and lodges are named as an indication of quality and rooms may be reserved at an establishment of similar quality. Published prices are inclusive of tariffs and other costs at the time of printing and are subject to change without notice.</p>

    <p class="section-title">Flights:</p>
    <p class="sub-section-title">Domestic Flights:</p>
    <p>The programs quote the average price of flights with approximate timings. Requests for specific flight times or changes to previously booked reservations may result in changes to the total price of the package.</p>

    <p class="section-title">Responsibility:</p>
    <p>The Company acts only as an agent for the participants in regard to travel, whether by rail road, boat, aircraft, or any other mode of transport, and assume no liability for injury, illness, damage, loss, accident, delay, or irregularity to person or property resulting directly or indirectly from any of the following causes: weather, acts of God, force major, acts of government or other authorities, wars, civil disturbances, labor disputes, riots, theft, mechanical breakdowns, quarantines or acts of default, delays, cancellations or changes made by any hotel, carrier, or restaurant. No responsibility is accepted for any additional expenses.</p>

    <p class="section-title">Special Requests:</p>
    <p>If the Client has any special requests, he should inform company at the time of booking. The Company and its suppliers will try to satisfy such requests, but, as these do not form part of the contract, the company does not guarantee to do so, including for pre-bookable seats. If the Company confirms that a special request has been noted or passed on to the supplier or refers to it on the confirmation invoice or elsewhere, this is not a guarantee to fulfill it. The Client will not be specifically notified if a special request cannot be met. The Company does not accept bookings, which are conditional on the fulfillment of any special request.</p>

    <p class="section-title">Children Policy:</p>
    <p class="sub-section-title">Policy 1: for packages, Nile cruises, and hotels</p>
    <ul>
      <li>Under 2 years old: free of charge</li>
      <li>Under 6 years old: 25% of total tour cost for an individual</li>
      <li>Under 12 years old: 50% of total tour cost for an individual</li>
      <li>All children 12 or older are considered adults.</li>
      <li>If your tour package includes flights, an extra supplement for your child may apply.</li>
    </ul>
    <p class="sub-section-title">Policy 2: for sightseeing tours & shore excursions</p>
    <ul>
      <li>Under 6 years old: free of charge</li>
      <li>Under 12 years old: 50% of total tour cost for an individual</li>
      <li>All children 12 or older are considered adults.</li>
      <li>If your sightseeing tours include domestic flights or ferry boat, an extra supplement for your child may apply.</li>
    </ul>

    <p class="section-title">Tipping:</p>
    <p>Tipping is customary for expressing one's satisfaction with good services rendered to him by staff on duty with him. We advise you to tip as you are willing. This will be greatly appreciated by staff, but you are not obligated to do so.</p>

    <p class="section-title">Complaints:</p>
    <p>If you have any complaints while you are in Egypt, please notify the company immediately because most problems can be solved quickly. If you feel that your problem persists call the chairman of the company while you are still on your tour; after you return home, if you are still not satisfied with the service you received you must write to the Egyptian Travel Agent Association. In the unlikely event that your complaint cannot be dealt with to your satisfaction by speaking to a Our staff member or the chairman of the company, you may refer your complaint to the Egyptian Ministry of Tourism in Cairo.</p>

    <p class="section-title">Acceptance of the agreement:</p>
    <p>The contract constituted by the company's acceptance of the client's booking, subject to these booking conditions, shall constitute the entire agreement between the Client and the Company. The payment of a deposit or final payment by bank transfer indicates that tour participants have read and accepted all terms and conditions and agree to abide by them.</p>
  `;
}
