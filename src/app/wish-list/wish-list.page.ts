// wishlist.page.ts
import { Component, OnInit } from '@angular/core'
import { CourseService } from '../services/course.service'
import { ToastController } from '@ionic/angular'
import { Course } from '../models/courses.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {
  wishlistCourses: Array<Course> = []
  totalItemsInCart: number = 0 // Variable to store the total count
  loading: boolean = false

  constructor(
    private router: Router,
    private courseService: CourseService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.courseService.cart$.subscribe((cart) => {
      this.totalItemsInCart = this.courseService.getTotalItemsInCart()
    })
  }

  ionViewWillEnter() {
    this.loadWishlist()
  }

  loadWishlist() {
    this.wishlistCourses = this.courseService.getWishlistCourses()
  }

  addToCart(course: Course) {
    this.courseService.addToCart(course)
    this.presentToast('Course added to cart!')
  }

  removeFromWishlist(course: Course) {
    this.courseService.removeFromWishlist(course)
    this.loadWishlist()
    this.presentToast('Course removed from wishlist!')
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    })
    toast.present()
  }

  /**
   * Fetch data
   */
  doRefresh(event?: any) {
    this.loadWishlist()
  }

  /**
   * Navigate to the cart-page
   */
  goToCartPage() {
    this.router.navigateByUrl('cart')
  }
}
