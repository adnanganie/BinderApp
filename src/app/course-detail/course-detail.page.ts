import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Swiper } from 'swiper'
import { register } from 'swiper/element/bundle'
import { Course } from '../models/courses.model'
import { ToastController } from '@ionic/angular'
import { CourseService } from '../services/course.service'
register()
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  selectedCourse: Course = new Course()

  constructor(
    private router: Router,
    private courseService: CourseService,
    private toastController: ToastController
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state
    if (state) {
      this.selectedCourse = state['selectedCourse']
    }
  }

  ngOnInit() {}

  /**
   * Add a selected course in the cart
   * @param course
   */
  addToCart(course: Course): void {
    const courseName = course.courseName
    if (this.courseService.isInCart(course)) {
      this.showPopup('Course is already in the cart', 'error-toast')
    } else {
      this.courseService.addToCart(course)
      this.showPopup('Course successfully added to the cart')
    }
  }

  /*
   * Add a selected course in the wish list
   * @param course
   */
  addToWishlist(course: Course): void {
    this.courseService.addToWishlist(course)
    this.showPopup('Course successfully added to the wishlist')
  }

  /**
   * Show Success Toast
   * @param courseName
   */
  async showPopup(
    message: string,
    toastBgColor: string = 'success-toast'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: toastBgColor,
    })

    await toast.present()
  }
}
