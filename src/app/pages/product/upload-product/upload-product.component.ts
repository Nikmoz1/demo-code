import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { ProductService } from 'src/app/services/product.service'
import { CategoryDialogComponent } from '../../categories/category-dialog/category.dialog.component'

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent {
  constructor (
    public ps: ProductService,
    public dialogRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  selectedFile: File | null = null
  uploading = true
  uploadProgress = 80
  onFileSelected (event: Event): void {
    const target = event.target as HTMLInputElement
    const files = target.files
    if ((files != null) && files.length > 0) {
      this.selectedFile = files[0]
      const uploadFileLabel = document.querySelector('.upload-file label')
      if (uploadFileLabel != null) {
        uploadFileLabel.textContent = this.selectedFile?.name ?? ''
      }
    }
  }

  formatFileSize (size: number): string {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1048576) {
      return (size / 1024).toFixed(1) + ' KB'
    } else if (size < 1073741824) {
      return (size / 1048576).toFixed(1) + ' MB'
    } else {
      return (size / 1073741824).toFixed(1) + ' GB'
    }
  }

  send (): void {
    this.dialogRef.close({
      file: this.selectedFile
    })
  }

  cancel (): void {
    this.selectedFile = null
  }
}
