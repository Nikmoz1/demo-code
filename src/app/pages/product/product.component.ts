import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DeleteProductComponent } from './delete-product/delete-product.component'
import { UploadProductComponent } from './upload-product/upload-product.component'
import { ProductService } from 'src/app/services/product.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor (private readonly dialog: MatDialog, public ps: ProductService) {
    this.ps.load()
  }

  onPageChanged (event: PageEvent): void {
    this.ps.load({ page: event.pageIndex + 1, size: event.pageSize })
  }

  changePage (pageIndex: number): void {
    this.paginator.pageIndex = pageIndex
  }

  deleteProduct (): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '500px',
      height: '200px',
      data: { id: '1111' }
    })

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    })
  }

  uploadTable (): void {
    const dialogRef = this.dialog.open(UploadProductComponent, {
      width: '350px',
      height: '150px',
      data: { id: '1111' }
    })

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    })
  }
}
