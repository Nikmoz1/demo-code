import { TreeData } from 'src/app/services/tree-function.service'
import { Component, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  @Output() deletedCategory = new EventEmitter()
  @Input() currentCategory!: TreeData

  deleteNode (): void {
    this.deletedCategory.emit(this.currentCategory)
  }
}
