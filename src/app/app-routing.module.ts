import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
  },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
