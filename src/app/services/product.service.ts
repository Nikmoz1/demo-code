import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environment'

interface Image {
  image: string
  id: number
}

export interface Product {
  id?: number
  categoryId: string
  productCode: string
  productNameUkr: string
  productNameRu: string
  price: number
  quantity: number
  discount: number
  discountPeriodFrom: string
  discountPeriodTo: string
  descriptionUkr: string
  descriptionRu: string
  video: string
  images: Image[]
  brand: string
  brandCountry: string
  weight: string
  packageSize: number
  productSize: number
}

interface Filter {
  page: number
  size: number
  category?: string
}

interface ResponseProducts {
  page: number
  pages: number
  products: Product[]
  size: number
  total: number
}

export interface ResponseOneProduct {
  message: string
  product: Product
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsTotal!: number
  products!: Product[]
  filter: Filter = {
    page: 1,
    size: 10
  }

  constructor (private readonly httpClient: HttpClient) {}

  getById (id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrl}/product/${id}`)
  }

  load (filter: Filter = this.filter): void {
    this.httpClient
      .get<ResponseProducts>(
        `${environment.apiUrl}/product/all?page=${filter.page}&size=${filter.size}`
    )
      .subscribe(resp => {
        if ((resp).products.length > 0) {
          this.products = this.fixImage((resp).products)
          this.productsTotal = (resp).total
        }
      })
  }

  fixImage (products: Product[]): Product[] {
    for (const product of products) {
      for (const image of product.images) {
        if (image.image.startsWith('/product')) {
          image.image = environment.apiUrl + image.image
        }
      }
    }
    return products
  }

  createProduct (product: Product): Observable<ResponseOneProduct> {
    const datePipe = new DatePipe('en-US')
    product.discountPeriodFrom = datePipe.transform(
      product.discountPeriodFrom,
      'yyyy-MM-dd'
    ) as string
    product.discountPeriodTo = datePipe.transform(
      product.discountPeriodTo,
      'yyyy-MM-dd'
    ) as string

    return this.httpClient.post<ResponseOneProduct>(
      `${environment.apiUrl}/product/create`,
      product
    )
  }

  updateProduct (
    product: Product,
    productId: string
  ): Observable<ResponseOneProduct> {
    return this.httpClient.patch<ResponseOneProduct>(
      `${environment.apiUrl}/product/${productId}`,
      product
    )
  }
}
