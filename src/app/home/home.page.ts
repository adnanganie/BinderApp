import { Component, ViewChild } from '@angular/core'
import { register } from 'swiper/element/bundle'
import { Course } from '../models/courses.model'
import { CourseService } from '../services/course.service'
import {
  IonInfiniteScroll,
  PopoverController,
  ToastController,
} from '@ionic/angular'
import { NavigationExtras, Router } from '@angular/router'
import { SortPopoverComponent } from '../components/sort-popover.component'

register()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll

  totalItemsInCart: number = 0 // Variable to store the total count

  listOfcourses: Course[] = []

  courses: Course[] = []
  filteredCourses: Course[] = []
  searchTerm: string = ''
  sortDirection: 'asc' | 'desc' = 'asc'

  itemsPerPage = 10
  currentPage = 1

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    public courseService: CourseService,
    public toastController: ToastController
  ) {}

  onSwiperReady() {}

  ngOnInit() {
    this.courseService.getClonedCourses().subscribe((courses) => {
      this.listOfcourses = courses
      this.paginatedCourses()
    })

    this.courseService.cart$.subscribe((cart) => {
      this.totalItemsInCart = this.courseService.getTotalItemsInCart()
    })
  }

  addToCart(course: Course): void {
    const courseName = course.courseName

    if (this.courseService.isInCart(course)) {
      this.showErrorToast(courseName)
    } else {
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
          course.tags?.some((tag: string) =>
            tag.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
      )
      .sort((a, b) => {
        const priceA = a.actualPrice
        const priceB = b.actualPrice

        if (this.sortDirection === 'asc') {
          return priceA - priceB
        } else {
          return priceB - priceA
        }
      })
  }

  /** Shows the data again when backspace key is pressed to clear search text
   * @param event
   */
  onSearchTextChanged(event: any) {
    const searchText = event.detail.value
    if (searchText.length == 0) {
      this.filteredCourses = this.courses
      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = false
      }
    } else {
      this.searchTerm = event.detail.value
      this.applyFilters()
    }
  }

  /**
   * Handles cancel event of searchbar
   */
  onSearchCancel(_$event: CustomEvent) {
    this.filteredCourses = this.courses
  }

  paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const result = this.listOfcourses.slice(startIndex, endIndex)
    if (this.currentPage === 1) {
      this.courses = result
      this.filteredCourses = result
    } else {
      this.courses = this.courses.concat(result)
      this.filteredCourses = this.courses
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.detail.value
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      this.currentPage++
      this.paginatedCourses()
      event.target.complete()

      if (
        this.currentPage > Math.ceil(this.courses.length / this.itemsPerPage)
      ) {
        event.target.disabled = true
      }
    }, 500)
  }

  /**
   * Show Success Toast
   * @param courseName 
   */
  async showSuccessToast(courseName: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `Course "${courseName}" successfully added to the cart.`,
      duration: 2000,
      position: 'bottom',
      cssClass: 'success-toast',
    })

    await toast.present()
  }

  /**
   * Show error toast
   * @param courseName 
   */
  async showErrorToast(courseName: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `Course "${courseName}" already exists in the cart.`,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      cssClass: 'error-toast',
    })

    await toast.present()
  }

  /**
   * Navigate to the cart-page
   */
  goToCartPage() {
    this.router.navigateByUrl('cart')
  }

  /**
   * Present Sort popover
   * @param ev
   * @returns
   */
  async presentSortPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SortPopoverComponent,
      event: ev,
    })

    popover.onDidDismiss().then((result) => {
      if (result.role === 'cancel') {
        return
      }
      this.sortDirection = result.data.direction
      this.applyFilters()
    })

    return await popover.present()
  }

  cardClickAction(course: Course) {
    const navigationExtras: NavigationExtras = {
      state: {
        selectedCourse: course,
      },
    }
    this.router.navigateByUrl('course-detail', navigationExtras)
  }
}
