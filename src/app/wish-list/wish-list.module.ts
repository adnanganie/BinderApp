import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WishListPage } from './wish-list.page'

import { WishListPageRoutingModule } from './wish-list-routing.module'

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, WishListPageRoutingModule],
  declarations: [WishListPage],
})
export class WishListPageModule {}
