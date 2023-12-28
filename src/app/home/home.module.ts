import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { HomePageRoutingModule } from './home-routing.module'
import { ComponentsModule } from '../components/components.module'

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule, ComponentsModule],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
