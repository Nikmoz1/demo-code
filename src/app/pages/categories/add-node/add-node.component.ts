import { TreeData } from 'src/app/services/tree-function.service'
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  @Input() isTop!: boolean
  @Input() currentNode!: TreeData
  @Output() addedNode = new EventEmitter()
  name!: string
  nameTranslate!: string
  image!: string

  constructor (public dialog: MatDialog) {}

  openDialog (): void {}
}
