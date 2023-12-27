import { Component, ElementRef, ViewChild } from '@angular/core'
import { Swiper } from 'swiper'
import { register } from 'swiper/element/bundle'

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
  constructor() {}

  onSwiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  onSlideChange($event: any) {
    console.log($event)
  }
}
