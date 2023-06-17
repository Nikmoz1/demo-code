import { Component, type OnInit } from '@angular/core'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { NestedTreeControl } from '@angular/cdk/tree'
import { Observable, of as observableOf } from 'rxjs'
import { TreeDataService } from '../../services/tree-data.service'
import {
  TreeFunctionService,
  type TreeData,
  ResponseTreeData
} from '../../services/tree-function.service'
import { FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { CategoryDialogComponent } from './category-dialog/category.dialog.component'
import { environment } from 'src/environment'

export interface DialogData {
  name: string
  image: string
  Component: string
  form: FormGroup
}

interface ChildCategory {
  parentId: number
  category: TreeData
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  nestedTreeControl!: NestedTreeControl<TreeData>
  nestedDataSource: MatTreeNestedDataSource<TreeData> =
    new MatTreeNestedDataSource<TreeData>()

  constructor (
    private readonly dataService: TreeDataService,
    private readonly service: TreeFunctionService,
    public dialog: MatDialog
  ) {
    this.dataService.load()
  }

  ngOnInit (): void {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren)
    this.nestedDataSource = new MatTreeNestedDataSource()
    this.dataService.categories.subscribe(
      data => (this.nestedDataSource.data = data)
    )
  }

  private readonly _getChildren = (
    category: TreeData
  ): Observable<TreeData[]> => observableOf(category.children)

  hasNestedChild = (_: number, categoryData: TreeData): boolean =>
    categoryData.children?.length > 0

  refreshTreeData (): void {
    const data = this.nestedDataSource.data
    this.nestedDataSource.data = []
    this.nestedDataSource.data = data
  }

  mutateDialog (category?: TreeData, isEdit: boolean = false): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      height: '540px',
      data: { category, isEdit }
    })

    dialogRef.afterClosed().subscribe((resultCategory): void => {
      if (isEdit) {
        if (resultCategory !== undefined) {
          this.editCategory(resultCategory.category)
        }
      } else if (resultCategory.parentId !== undefined) {
        this.addChildCategory({
          parentId: resultCategory.parentId,
          category: resultCategory.category
        })
      } else {
        this.addCategory(resultCategory)
      }
    })
  }

  addCategory (categoryData: ResponseTreeData): void {
    this.service
      .createCategory(categoryData.category)
      .subscribe((res: ResponseTreeData) => {
        if (res !== undefined && res !== null) {
          this.nestedDataSource.data.push(this.fixImage(res.category))
          this.refreshTreeData()
        }
      })
  }

  addChildCategory (childrenCategoryData: ChildCategory): void {
    childrenCategoryData.category.parentId = childrenCategoryData.parentId
    this.service
      .createCategory(childrenCategoryData.category)
      .subscribe((res: ResponseTreeData) => {
        if (res !== null) {
          const parent = this.service.findCategoryById(
            childrenCategoryData.parentId,
            this.nestedDataSource.data
          )

          if (parent != null) {
            parent.children.push(this.fixImage(res.category))
          }

          this.refreshTreeData()
        }
      })
  }

  fixImage (category: TreeData): TreeData {
    category.image =
      category.image !== null && category.image !== undefined
        ? environment.apiUrl + category.image
        : ''
    return category
  }

  editCategory (category: TreeData): void {
    const fatherElement = this.service.findFatherCategory(
      category.id as number,
      this.nestedDataSource.data
    ) as [TreeData, number]
    let index: number
    category.image = category.image.replace(environment.apiUrl, '')
    this.service
      .updateCategory(category)
      .subscribe((resp: ResponseTreeData) => {
        if (resp !== null) {
          if (fatherElement !== undefined) {
            index = this.service.findPosition(
              category.id as number,
              this.nestedDataSource.data
            ) as number
            const foundCategory = this.nestedDataSource.data.find(
              cat => cat.id === category.id
            )
            if (foundCategory !== undefined) {
              const children = foundCategory.children
              this.nestedDataSource.data[index] = resp.category
              this.nestedDataSource.data[index].children = children
            }
          } else {
            const foundCategory = this.service.findFatherCategory(
              category.id as number,
              this.nestedDataSource.data
            ) as [TreeData, number]
            if (foundCategory !== undefined) {
              const children =
                foundCategory[0].children[foundCategory[1]].children
              foundCategory[0].children[foundCategory[1]] = resp.category
              foundCategory[0].children[foundCategory[1]].children = children
            }
          }
          this.refreshTreeData()
        }
      })
  }

  deleteObjectById (id: number, list: TreeData[]): TreeData[] {
    return list.filter(obj => obj.id !== id)
  }

  deleteCategory (category: TreeData): void {
    if (
      window.confirm(
        'Ви дійсно хочете видалити цю категорію ' + category.name + '?'
      )
    ) {
      this.service.deleteCategory(category.id as number).subscribe(resp => {
        if (resp) {
          this.service.findCategoryById(
            category.id as number,
            this.nestedDataSource.data
          )

          const deletedElement = this.service.findFatherCategory(
            category.id as number,
            this.nestedDataSource.data
          ) as [TreeData, number]
          let elementPosition!: number
          if (deletedElement[0] !== undefined) {
            deletedElement[0].children.splice(deletedElement[1], 1)
          } else {
            elementPosition = this.service.findPosition(
              category.id as number,
              this.nestedDataSource.data
            ) as number
            this.nestedDataSource.data.splice(elementPosition, 1)
          }

          this.refreshTreeData()
        }
      })
    }
  }
}
