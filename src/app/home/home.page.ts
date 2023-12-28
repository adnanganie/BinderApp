import { Component, ElementRef, ViewChild } from '@angular/core'
import { Swiper } from 'swiper'
import { register } from 'swiper/element/bundle'
import { Course } from '../models/courses.model'
import { CourseService } from '../services/course.service'
import { ToastController } from '@ionic/angular'

register()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined
  swiper?: Swiper

  totalItemsInCart: number = 0; // Variable to store the total count

  courses: Course[] = []
  filteredCourses: Course[] = []
  searchTerm: string = ''
  sortDirection: 'asc' | 'desc' = 'asc'

  constructor(public courseService: CourseService,   public toastController: ToastController) {}

  onSwiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  ngOnInit() {
    this.courseService.getCoursesWithActualPrice().subscribe((courses) => {
      this.courses = courses
      this.filteredCourses = this.courses
    })

    this.courseService.cart$.subscribe((cart) => {
      this.totalItemsInCart = this.courseService.getTotalItemsInCart();
    });
  }

  addToCart(course: Course): void {
    const courseName = course.courseName

    if (this.courseService.isInCart(course)) {
      // Course already exists in the cart, show error toast
      this.showErrorToast(courseName)
    } else {
      // Add course to cart and show success toast
      this.courseService.addToCart(course)
      this.showSuccessToast(courseName)
    }
  }

  addToWishlist(course: Course): void {
    this.courseService.addToWishlist(course)
  }

  /**
   * Apply search and sort filters
   *
   */
  applyFilters(): void {
    this.filteredCourses = this.courses
      .filter(
        (course) =>
          course.courseName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          course.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          course.tags.some((tag: string) =>
            tag.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        const priceA = parseFloat(
          a.actualPrice.replace('₹', '').replace(',', '')
        )
        const priceB = parseFloat(
          b.actualPrice.replace('₹', '').replace(',', '')
        )

        if (this.sortDirection === 'asc') {
          return priceA - priceB
        } else {
          return priceB - priceA
        }
      })
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.detail.value
    this.applyFilters()
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    this.applyFilters()
  }

  async showSuccessToast(courseName: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `Course "${courseName}" successfully added to the cart.`,
      duration: 2000,
      position: 'bottom',
    })

    await toast.present()
  }

  async showErrorToast(courseName: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `Course "${courseName}" already exists in the cart.`,
      duration: 2000,
      position: 'bottom',
      color: 'danger', // Optional: Set color for error messages
    })

    await toast.present()
  }

  /**
   * Navigate to the cart-page
   */
  goToCartPage(){

  }
}
