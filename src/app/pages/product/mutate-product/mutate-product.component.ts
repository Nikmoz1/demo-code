import { Product, ProductService } from '../../../services/product.service'
import { SafeUrl } from '@angular/platform-browser'
import { Component } from '@angular/core'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
import { TreeDataService } from 'src/app/services/tree-data.service'
import { TreeData } from 'src/app/services/tree-function.service'
import { Options } from 'src/app/components/select-form/select-form.component'
import { environment } from 'src/environment'
import { NgxDropzoneChangeEvent } from 'ngx-dropzone'

export interface FileHandle {
  file: File
  url: SafeUrl
}

@Component({
  selector: 'app-mutate-product',
  templateUrl: './mutate-product.component.html',
  styleUrls: ['./mutate-product.component.scss']
})
export class MutateProductComponent {
  images: string[] = []
  previewImage: string | null = null
  newIndex!: number

  moveToSecond (index: number, newIndex: number): void {
    const fileToMove = this.images[index]
    this.images.splice(index, 1)
    this.images.splice(newIndex, 0, fileToMove)
  }

  onSelectPhoto (event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (files != null) {
      const fileArray = Array.from(files)
      const fileURLs = fileArray.map(file => URL.createObjectURL(file))
      this.images.push(...fileURLs)
    }
  }

  onRemovePhoto (event: string): void {
    const index = this.images.indexOf(event)
    if (index !== -1) {
      this.images.splice(index, 1)
    }
  }

  onFileSelected (event: Event): void {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files != null) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result !== undefined) {
            this.images.push(e.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  removeImage (image: string): void {
    const index = this.images.indexOf(image)
    this.images.splice(index, 1)
  }

  video: File | null = null
  videoByte = ''

  handleFileInput (event: NgxDropzoneChangeEvent): void {
    const file = event.addedFiles[0]
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e?.target?.result !== undefined) {
        this.videoByte = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
    this.video = file
  }

  productId: string = this._router.url.startsWith('/products/create')
    ? ''
    : this._router.url.replace('/products/', '')

  form!: FormGroup
  public options: Options[] = []
  product = {}
  constructor (
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    public ps: ProductService,
    public cs: TreeDataService
  ) {
    this.form = this._generateForm()
    if (this.productId !== '') {
      this.ps.getById(this.productId).subscribe((resp: Product) => {
        for (const image of resp.images) {
          if (image.image.startsWith('/product')) {
            image.image = environment.apiUrl + image.image
          }
          this.images = resp.images.map(item => item.image)
          this.form = this._generateForm(resp)
        }
      })
    }
    this.cs.lastChildrens().subscribe(resp => {
      this.options = resp.categories.map((category: TreeData) => ({
        value: category.id as number,
        name: category.name
      }))
    })
  }

  private _generateForm (product?: Product): FormGroup {
    const form: FormGroup = this._fb.group({
      categoryId: [product != null ? product.categoryId : ''],
      productCode: [product != null ? product.productCode : ''],
      productNameUkr: [product != null ? product.productNameUkr : ''],
      productNameRu: [product != null ? product.productNameRu : ''],
      price: [product != null ? product.price : ''],
      quantity: [product != null ? product.quantity : ''],
      discount: [product != null ? product.discount : ''],
      discountPeriodFrom: [product != null ? product.discountPeriodFrom : ''],
      discountPeriodTo: [product != null ? product.discountPeriodTo : ''],
      descriptionUkr: [product != null ? product.descriptionUkr : ''],
      descriptionRu: [product != null ? product.descriptionRu : ''],
      video: [product != null ? product.video : this.video],
      images: [product != null ? this.images : []],
      brand: [product != null ? product.brand : ''],
      brandCountry: [product != null ? product.brandCountry : ''],
      packageSize: [product != null ? product.packageSize : ''],
      weight: [product != null ? product.weight : ''],
      productSize: [product != null ? product.productSize : ''],
      newIndex: new FormControl('', [Validators.required, Validators.min(0)])
    })
    return form
  }

  async submitForm (): Promise<void> {
    this.form.value.video = this.videoByte
    this.form.value.images = []
    if (this.productId !== '') {
      try {
        const resp = await this.ps
          .updateProduct(this.form.value, this.productId)
          .toPromise()
        const productId = resp?.product?.id?.toString() ?? ''
        await this._router.navigate([`/products/${productId}`])
      } catch (error) {
        // Handle the error here
      }
    } else {
      try {
        const resp = await this.ps.createProduct(this.form.value).toPromise()
        const productId = resp?.product?.id?.toString() ?? ''
        await this._router.navigate([`/products/${productId}`])
      } catch (error) {
        // Handle the error here
      }
    }
  }
}
