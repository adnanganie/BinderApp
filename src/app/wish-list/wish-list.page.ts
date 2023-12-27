import { Component } from '@angular/core'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone'
import { ExploreContainerComponent } from '../explore-container/explore-container.component'

@Component({
  selector: 'app-wish-list',
  templateUrl: 'wish-list.page.html',
  styleUrls: ['wish-list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class WishListPage {
  constructor() {}
}
