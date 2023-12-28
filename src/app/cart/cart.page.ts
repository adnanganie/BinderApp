// cart.page.ts
import { Component, OnInit } from '@angular/core'
import { CourseService } from '../services/course.service'
import { Course } from '../models/courses.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartCourses: Array<Course> = []
  totalCost: number = 0

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.loadCart()
  }

  loadCart() {
    this.courseService.cart$.subscribe((courses) => {
      this.cartCourses = courses
    })
    this.calculateTotalCost()
  }

  calculateTotalCost() {
    this.totalCost = this.cartCourses.reduce(
      (sum, course) => sum + (course.actualPrice || 0),
      0
    )
  }

  /*
   * Navigate to the checkout screen
   */
  goToCheckout() {
    this.router.navigateByUrl('checkout')
  }

  /**
   * Fetch data
   */
  doRefresh(event?: any) {
    this.loadCart()
  }
}
