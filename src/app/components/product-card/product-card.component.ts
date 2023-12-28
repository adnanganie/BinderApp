import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() id?: string
  @Input() title?: string
  @Input() subTitle1?: string
  @Input() subTitle2?: string
  @Input() subTitle3?: string
  @Input() imgSrc?: string
  @Input() isInCart = false
  @Output() cardContentEvent = new EventEmitter()
  @Output() iconClickEvent = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  /**
   * On card content clicked
   */
  onCardContentAction() {
    this.cardContentEvent.emit()
  }

  /**
   * On Icon clicked
   */
  iconClickAction() {
    this.iconClickEvent.emit()
  }
}
