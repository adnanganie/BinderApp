import { Component } from '@angular/core'
import { PopoverController } from '@ionic/angular'

@Component({
  selector: 'app-sort-popover',
  template: `
    <ion-list>
      <ion-item (click)="sort('asc')">Sort Asc</ion-item>
      <ion-item (click)="sort('desc')">Sort Desc</ion-item>
    </ion-list>
  `,
})
export class SortPopoverComponent {
  constructor(private popoverController: PopoverController) {}

  sort(direction: 'asc' | 'desc') {
    this.popoverController.dismiss({ direction })
  }
}
