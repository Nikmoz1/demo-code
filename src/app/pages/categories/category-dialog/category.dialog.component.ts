import { FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'
import { TreeData } from 'src/app/services/tree-function.service'
import { environment } from 'src/environment'

@Component({
  selector: 'app-new-node',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  form!: FormGroup
  constructor (
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { category: TreeData, node: TreeData, isEdit: boolean },
    private readonly _fb: FormBuilder
  ) {
    if (data.isEdit) {
      this.form = this._generateForm(data.category)
    } else {
      this.form = this._generateForm()
    }
  }

  imageUrl: string = ''

  private _generateForm (category?: TreeData): FormGroup {
    if (category != null && category.image !== '') {
      const timestamp = new Date().getTime() // Generate a timestamp
      this.imageUrl = this.checkImage(category.image)
      this.imageUrl += `?timestamp=${timestamp}`
    }

    const form = this._fb.group({
      name: [category != null ? category.name : ''],
      nameTranslate: [category != null ? category.nameTranslate : ''],
      image: [category != null ? category.image : this.imageUrl]
    })
    return form
  }

  checkImage (imageUrl: string): string {
    if (imageUrl.startsWith('/category')) {
      return environment.apiUrl + imageUrl
    } else return imageUrl
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  mutateClick (): void {
    this.dialogRef.close({
      category: {
        id: this.data.isEdit ? this.data.category.id : null,
        name: this.form.get('name')?.value,
        nameTranslate: this.form.get('nameTranslate')?.value,
        image: this.form.get('image')?.value
      },
      parentId: this.data.category?.id
    })
  }

  onFileChange (event: Event): void {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file != null) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string
        this.imageUrl = result
        if (this.imageUrl !== '') {
          this.form.get('image')?.setValue(this.imageUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
