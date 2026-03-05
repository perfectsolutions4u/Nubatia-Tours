import { Component, signal, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { BookingService } from '../../services/booking.service';
// Import ngx-dropzone-next components
// Using wrapper components to work around Angular 20 static analysis issue
import {
  NgxDropzoneComponent,
  NgxDropzoneLabelDirective,
  NgxDropzoneImagePreviewComponent,
} from '../../shared/components/ngx-dropzone-wrapper/ngx-dropzone-wrapper.component';
// Also import the actual components to ensure they're available at runtime
// This import is needed even though it causes static analysis warnings
import 'ngx-dropzone-next';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TourCartComponent } from '../../shared/components/tour-cart/tour-cart.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgxDropzoneComponent,
    NgxDropzoneLabelDirective,
    NgxDropzoneImagePreviewComponent,
    CommonModule,
    ReactiveFormsModule,
    CarouselModule,
    TourCartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('tabContent', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))],
          { optional: true }
        ),
      ]),
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('menuItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('staggerMenu', [
      transition(':enter', [
        query(
          'li',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private _DataService: DataService,
    private _BookingService: BookingService,
    private _ProfileService: ProfileService,
    private _AuthService: AuthService,
    private _Router: Router,
    private toaster: ToastrService,
    private seoService: SeoService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  bannerTitle: string = 'my profile';
  updateProfile!: FormGroup;
  updateImage!: FormGroup;
  countriesList: any[] = [];
  tourCart: any[] = [];
  favList: any[] = [];
  haveData: boolean = false;
  profilemeData: any = {};

  files = signal<File[]>([]);

  selectedTab: string = 'dashboard';

  ngOnInit(): void {
    this.seoService.updateSeoData(
      {},
      'Nubatia Tours - My Account',
      'Manage your profile, bookings, and preferences with Nubatia Tours. Access your account dashboard.',
      '../../../assets/image/new-tourism-logo.webp'
    );

    // Check if we're in browser environment (for SSR compatibility)
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip token check on server side
    }

    // Check token using isLoggedIn() method which properly handles browser check
    const token = this._AuthService.getToken();
    const isLoggedIn = this._AuthService.isLoggedIn();

    console.log('Token check:', {
      token,
      isLoggedIn,
      hasToken: !!token,
      localStorageToken: localStorage.getItem('accessToken'),
    });

    if (token && isLoggedIn) {
      this.showCountries();
      this.profileMe();
      this.updateProfile = new FormGroup({
        name: new FormControl(''),
        password: new FormControl(''),
        password_confirmation: new FormControl(''),
        phone: new FormControl(''),
        // email: new FormControl(''),
        nationality: new FormControl(''),
      });
      this.updateImage = new FormGroup({
        image: new FormControl(''),
      });

      this.getListCart();
      this.getFav();
    } else {
      this._Router.navigate(['/login']);
      this.toaster.warning('Please Login First');
    }
  }

  /** فتح نافذة اختيار الملف عند النقر (من الـ input العادي) */
  onFileInputChange(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const fileList = input.files;
    if (!fileList?.length) return;
    const addedFiles = Array.from(fileList);
    input.value = '';
    // تشغيل التحديث في الدورة التالية لضمان ظهور المعاينة مع OnPush
    setTimeout(() => this.onSelect({ addedFiles, rejectedFiles: [] }), 0);
  }

  // عند الاختيار
  onSelect(evt: any) {
    const added: File[] = evt?.addedFiles ?? [];
    if (!added.length) return;

    // إخفاء صورة السيرفر مؤقتاً وإظهار معاينة الملف الجديد
    this.profilemeData = { ...this.profilemeData, image: null };
    this.files.set([added[0]]);
    this.cdr.markForCheck(); // إجبار تحديث الواجهة مع OnPush
    this.uploadImage(added[0]);
  }

  onRemove(file: File) {
    this.files.set([]);
  }

  uploadImage(file: File): void {
    const userImage = new FormData();
    userImage.append('image', file);

    this._ProfileService.updateImageProfile(userImage).subscribe({
      next: (res) => {
        // نظّف ملفات الـ preview أولاً
        this.files.set([]);
        // حدّث الصورة من الاستجابة أو من خلال جلب البروفايل من السيرفر
        const serverUrl = res?.data?.image ?? res?.data?.user?.image ?? res?.image ?? res?.url ?? null;
        if (serverUrl) {
          this.profilemeData = { ...this.profilemeData, image: this.cacheBust(serverUrl) };
        } else {
          // لو الـ API رجّع البروفايل كامل أو شكل مختلف، نحدّث من جلب البروفايل
          this.profileMe();
          this.toaster.success('Profile image updated');
          return;
        }
        this.toaster.success('Profile image updated');
        this.cdr.detectChanges(); // إجبار تحديث الواجهة فوراً بدون ريفرش
      },
      error: (err) => {
        console.error('Upload error ❌', err);
        this.toaster.error(err?.error?.message || 'Upload failed');
        // في حالة فشل الرفع رجّع البريفيو كما كان
        this.files.set([]);
        this.profileMe(); // رجّع صورة السيرفر (لو كانت موجودة)
      },
    });
  }

  // إضافة query param لكسر الكاش
  private cacheBust(url: string): string {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}_ts=${Date.now()}`;
  }

  getListCart(): void {
    this._BookingService.getCartList().subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.tourCart = response.data;
          if (this.tourCart.length === 0) {
            this.haveData = false;
            // // console.log(this.tourCart);
          } else {
            this.tourCart = response.data.map((tour: any) => ({
              ...tour,
              totalPrice:
                tour.adults * tour.tour.adult_price +
                tour.children * tour.tour.child_price +
                tour.infants * tour.tour.infant_price,
            }));
            this.haveData = true;
            // console.log(this.tourCart);
          }
          this.cdr.markForCheck();
        }, 0);
      },
      error: (err: any) => {
        // console.log(err);
      },
    });
  }

  showCountries(): void {
    const cachedCountries = this._DataService.getFromLocalStorage('majestic_countries');
    if (cachedCountries && cachedCountries.data) {
      setTimeout(() => {
        const data = cachedCountries.data;
        this.countriesList = Array.isArray(data) ? data : data.data;
        this.cdr.markForCheck();
      }, 0);
      return;
    } else {
      this._BookingService.getCountries().subscribe({
        next: (response: any) => {
          const data = response?.data;
          this.countriesList = Array.isArray(data) ? data : data.data;
          this.cdr.markForCheck();
        },
      });
    }
  }

  submitProfileData(): void {
    if (this.updateProfile.valid) {
      const profileData = this.updateProfile.value;
      // console.log(profileData);
      this._ProfileService.updateProfile(profileData).subscribe({
        next: (response) => {
          // console.log(response);
          this.toaster.success(response.error.message);
        },
        error: (err) => {
          // console.log(err);
          this.toaster.error(err.error.message);
        },
      });
    } else {
      // console.log('nooooo');
    }
  }

  profileMe(): void {
    this._ProfileService.getProfile().subscribe({
      next: (response) => {
        this.profilemeData = { ...response.data, image: response?.data?.image ? this.cacheBust(response.data.image) : null };
        this.files.set([]);
        this.cdr.detectChanges(); // تحديث الواجهة فوراً
      },
      error: (err) => {
        // console.log(err);
        // // console.log(localStorage.getItem('accessToken'));
      },
    });
  }

  logout(): void {
    this._ProfileService.logoutProfile().subscribe({
      next: (response) => {
        // // console.log(response);
        localStorage.removeItem('accessToken');
        // navigate it to home
        this._Router.navigate(['']);
        // // console.log('ahmed');
        this.toaster.success(response.message);
      },
      error: (err) => {
        // // console.log(err);
        this.toaster.error(err.error.message);
      },
    });
  }

  getFav(): void {
    this._DataService.getWishlist().subscribe({
      next: (response) => {
        if (localStorage.getItem('accessToken')) {
          setTimeout(() => {
            this.favList = response.data.data;
            // console.log(response.data.data);
            if (this.favList.length === 0) {
              this.haveData = false;
            // // console.log(this.favList.length);
            } else {
              this.haveData = true;
              // console.log(response.data.data);
              this.favList = response.data.data;
            }
            this.cdr.markForCheck();
          }, 0);
        }
      },
      error: (err) => {
        // this.toaster.error(err.error.message, 'you must login first');
      },
    });
  }

  bookingOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
    smartSpeed: 1500,
    margin: 10,
    responsive: {
      0: { items: 1 },
      586: { items: 2 },
    },
    nav: false,
  };
}
