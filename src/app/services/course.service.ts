// course.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map } from 'rxjs'
import { Course } from '../models/courses.model'

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = []
  private cart: Course[] = []
  private wishlist: Course[] = []

  courses$ = new BehaviorSubject<Course[]>([])
  cart$ = new BehaviorSubject<Course[]>([])
  wishlist$ = new BehaviorSubject<Course[]>([])

  constructor() {
    this.courses = [
      {
        courseName: 'Advanced Machine Learning',
        author: 'Alex Johnson',
        actualPrice: '₹1199',
        discountPercentage: '15%',
        tags: ['Machine Learning', 'Python'],
      },
      {
        courseName: 'JavaScript Frameworks Masterclass',
        author: 'Emily White',
        actualPrice: '₹899',
        discountPercentage: '20%',
        tags: ['JavaScript', 'React', 'Vue'],
      },
      {
        courseName: 'Full Stack Development with Django',
        author: 'Chris Turner',
        actualPrice: '₹1499',
        discountPercentage: '10%',
        tags: ['Python', 'Django', 'JavaScript'],
      },
      {
        courseName: 'Cybersecurity Essentials',
        author: 'Sophia Davis',
        actualPrice: '₹1299',
        discountPercentage: '25%',
        tags: ['Cybersecurity', 'Network Security'],
      },
      {
        courseName: 'Mobile App UX Design',
        author: 'Daniel Smith',
        actualPrice: '₹999',
        discountPercentage: '18%',
        tags: ['UX Design', 'Mobile App Development'],
      },
      {
        courseName: 'Node.js for Beginners',
        author: 'Ava Williams',
        actualPrice: '₹699',
        discountPercentage: '22%',
        tags: ['Node.js', 'JavaScript'],
      },
      {
        courseName: 'Artificial Intelligence in Business',
        author: 'Noah Turner',
        actualPrice: '₹1599',
        discountPercentage: '12%',
        tags: ['Artificial Intelligence', 'Business'],
      },
      {
        courseName: 'Swift Programming for iOS',
        author: 'Emma Johnson',
        actualPrice: '₹1099',
        discountPercentage: '17%',
        tags: ['iOS', 'Swift'],
      },
      {
        courseName: 'Responsive Web Design Principles',
        author: 'Liam White',
        actualPrice: '₹799',
        discountPercentage: '21%',
        tags: ['Web Design', 'HTML', 'CSS'],
      },
      {
        courseName: 'Java Fundamentals',
        author: 'Olivia Turner',
        actualPrice: '₹899',
        discountPercentage: '0',
        tags: ['Java'],
      },
      {
        courseName: 'Game Development with Unity',
        author: 'Lucas Davis',
        actualPrice: '₹1399',
        discountPercentage: '14%',
        tags: ['Game Development', 'Unity'],
      },
      {
        courseName: 'Python for Data Science',
        author: 'Aria Smith',
        actualPrice: '₹1199',
        discountPercentage: '0',
        tags: ['Python', 'Data Science'],
      },
      {
        courseName: 'Frontend Development Bootcamp',
        author: 'Mia Johnson',
        actualPrice: '₹999',
        discountPercentage: '18%',
        tags: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        courseName: 'C# Programming Mastery',
        author: 'Jackson White',
        actualPrice: '₹1099',
        discountPercentage: '0',
        tags: ['C#'],
      },
      {
        courseName: 'Angular Framework Deep Dive',
        author: 'Ava Turner',
        actualPrice: '₹1299',
        discountPercentage: '15%',
        tags: ['Angular'],
      },
      {
        courseName: 'Data Visualization with D3.js',
        author: 'Ethan Davis',
        actualPrice: '₹899',
        discountPercentage: '0',
        tags: ['Data Visualization', 'D3.js'],
      },
      {
        courseName: 'Android App Development Basics',
        author: 'Isabella Smith',
        actualPrice: '₹799',
        discountPercentage: '0',
        tags: ['Android', 'Mobile App Development'],
      },
      {
        courseName: 'Vue.js for Frontend Development',
        author: 'Logan Johnson',
        actualPrice: '₹999',
        discountPercentage: '18%',
        tags: ['Vue.js', 'JavaScript'],
      },
      {
        courseName: 'Cloud Computing Fundamentals',
        author: 'Sophie Turner',
        actualPrice: '₹1199',
        discountPercentage: '16%',
        tags: ['Cloud Computing'],
      },
    ]

    this.courses$.next(this.courses)
  }

  addToCart(course: Course): void {
    this.cart.push(course)
    this.cart$.next(this.cart)
  }

  addToWishlist(course: Course): void {
    this.wishlist.push(course)
    this.wishlist$.next(this.wishlist)
  }

  isInWishlist(course: Course): boolean {
    return this.wishlist.some(
      (wishlistCourse) => wishlistCourse.courseName === course.courseName
    )
  }

  isInCart(course: any): boolean {
    return this.cart.some((cartItem) => cartItem.courseName === course.courseName);
  }
  getTotalItemsInCart(): number {
    return this.cart.length;
  }

  getCoursesWithActualPrice(): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses.map((course) => ({
          ...course,
          discountPrice: this.calculateActualPrice(course.actualPrice, course.discountPercentage),
        }))
      )
    );
  }

  private calculateActualPrice(originalPrice: string, discountPercentage: string): string {
    const price = parseFloat(originalPrice.replace('₹', '').replace(',', ''));
    const discount = parseFloat(discountPercentage.replace('%', ''));
    const actualPrice = price - (price * (discount / 100));
    return '₹' + actualPrice.toFixed(2).toString();
  }
}
