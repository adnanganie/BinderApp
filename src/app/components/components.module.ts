/**
 * @author Adnan Ayoub
 * @email [adnanganie@gmail.com]
 * @create date 2023-12-27 23:33:06
 * @modify date 2023-12-27 23:33:06
 * @desc [Components Module]
 */

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CourseItemComponent } from './course-item/course-item.component'
import { ProductCardComponent } from './product-card/product-card.component'
import { EmptyViewComponent } from './empty-view/empty-view.component'
import { SkeletonViewComponent } from './skeleton-view/skeleton-view.component'
import { InfoDialogComponent } from './info-dialog/info-dialog.component'
import { SortPopoverComponent } from './sort-popover.component'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule.forRoot()],
  declarations: [
    CourseItemComponent,
    ProductCardComponent,
    EmptyViewComponent,
    SkeletonViewComponent,
    InfoDialogComponent,
    SortPopoverComponent,
  ],
  exports: [
    CourseItemComponent,
    ProductCardComponent,
    EmptyViewComponent,
    SkeletonViewComponent,
    InfoDialogComponent,
    SortPopoverComponent,
  ],
})
export class ComponentsModule {}
