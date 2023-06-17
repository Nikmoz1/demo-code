import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { ProductComponent } from './pages/product/product.component'
// import { CategoriesComponent } from './pages/categories/categories.component';
import { MutateProductComponent } from './pages/product/mutate-product/mutate-product.component'
import { CategoryComponent } from './pages/categories/category.component'
import { HomeComponent } from './pages/home/home.component'
import { AssociationsComponent } from './pages/product/associations/associations.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/create', component: MutateProductComponent },
  { path: 'products/:id', component: MutateProductComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'associations', component: AssociationsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
