import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductComponent } from './pages/product/product.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { DeleteProductComponent } from './pages/product/delete-product/delete-product.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MutateProductComponent } from './pages/product/mutate-product/mutate-product.component'
import { UploadProductComponent } from './pages/product/upload-product/upload-product.component'
import { DefaultButtonComponent } from './components/default-button/default-button.component'
import { InputFormComponent } from './components/input-form/input-form.component'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { SelectFormComponent } from './components/select-form/select-form.component'
import { TextareaFormComponent } from './components/textarea-form/textarea-form.component'
import { DatepickerFormComponent } from './components/datepicker-form/datepicker-form.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatTreeModule } from '@angular/material/tree'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { CategoryComponent } from './pages/categories/category.component'
import { AddNodeComponent } from './pages/categories/add-node/add-node.component'
import { DeleteCategoryComponent } from './pages/categories/delete-category/delete-category.component'
import { CategoryDialogComponent } from './pages/categories/category-dialog/category.dialog.component'
import { HomeComponent } from './pages/home/home.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { DragulaModule } from 'ng2-dragula'
import { EditorModule } from '@tinymce/tinymce-angular'
import { AssociationsComponent } from './pages/product/associations/associations.component'

@NgModule({
  // entryComponents: [EditNodeDialog],
  declarations: [
    AppComponent,
    ProductComponent,
    SidebarComponent,
    DeleteProductComponent,
    MutateProductComponent,
    UploadProductComponent,
    DefaultButtonComponent,
    InputFormComponent,
    SelectFormComponent,
    TextareaFormComponent,
    DatepickerFormComponent,
    CategoryComponent,
    DeleteCategoryComponent,
    CategoryDialogComponent,
    AddNodeComponent,
    HomeComponent,
    AssociationsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxDropzoneModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    DragulaModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
