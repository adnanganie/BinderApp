import { Component, NgZone, OnInit } from '@angular/core'
import { PopoverController } from '@ionic/angular'
import { CourseService } from '../services/course.service'
import { Course } from '../models/courses.model'
import { Router } from '@angular/router'
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartCourses: Array<Course> = []
  totalCost: number = 0
  totalSavings: number = 0

  constructor(
    private router: Router,
    private zone: NgZone,
    private popoverController: PopoverController,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadCart()
  }

  /**
   * Load data
   */
  loadCart() {
    this.courseService.cart$.subscribe((courses) => {
      this.cartCourses = courses
    })
    this.calculateTotalCost()
  }

  /**
   * Calculate total cost for the courses in cart
   */
  calculateTotalCost() {
    this.totalCost = this.cartCourses.reduce(
      (sum, course) => sum + (course.actualPrice || 0),
      0
    )
    this.totalSavings = this.cartCourses.reduce(
      (sum, course) =>
        sum + (course.actualPrice || 0) * this.getDiscountPercentage(course),
      0
    )
  }

  /*
   * Move selected course to wish list from cart
   */
  moveCourseToWishlist(course: Course) {
    this.courseService.addToWishlist(course)
    this.courseService.removeFromCart(course)
    this.loadCart()
  }

  /**
   * Delete selected course from cart
   * @param course
   */
  deleteCourse(course: Course) {
    this.courseService.removeFromCart(course)
    this.loadCart()
  }

  /**
   * Get discount
   * @param course
   * @returns
   */
  getDiscountPercentage(course: Course) {
    return parseInt(course.discountPercentage.replace('%', ''), 10) / 100
  }

  /**
   * On tap on the checkout button show dialaog
   */
  checkout() {
    this.presentDialog()
  }

  /**
   * Present  Success  dialog
   */
  async presentDialog() {
    const title = 'Your order has been placed successfully!'
    const popover = await this.popoverController.create({
      component: InfoDialogComponent,
      cssClass: 'popover-custom-class',
      mode: 'md',
      animated: true,
      backdropDismiss: false,
      componentProps: {
        title: title,
      },
    })
    await popover.present()
    await popover.onDidDismiss().then((_data) => {
      this.navigateTo()
    })
  }

  /**
   * Navigate to dashboard page
   */
  navigateTo() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.zone.run(() => {
          this.courseService.clearCart()
          this.loadCart()
          this.router.navigateByUrl('tabs')
        })
      }, 500)
    })
  }

  /**
   * Fetch data
   */
  doRefresh(event?: any) {
    this.loadCart()
  }
}
