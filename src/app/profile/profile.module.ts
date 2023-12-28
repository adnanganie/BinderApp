import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfilePage } from './profile.page'

import { ProfilePageRoutingModule } from './profile-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
