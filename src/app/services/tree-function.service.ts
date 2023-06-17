import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { noPropertyError } from './error.service'
export interface TreeData {
  id?: number
  name: string
  nameTranslate: string
  image: string
  children: TreeData[]
  parentId?: number
}

export interface ResponseTreeData {
  category: TreeData
}

@Injectable({
  providedIn: 'root'
})
export class TreeFunctionService {
  constructor (private readonly httpClient: HttpClient) {}

  createCategory (category: TreeData): Observable<ResponseTreeData> {
    return this.httpClient.post<ResponseTreeData>(
      'http://localhost:8080/api/v1/category/create',
      category
    )
  }

  flatJsonArray (flattenedArray: TreeData[], node: TreeData[]): TreeData[] {
    const array: TreeData[] = flattenedArray
    node.forEach(element => {
      array.push(element)
      if (element.children.length > 0) {
        this.flatJsonArray(array, element.children)
      }
    })
    return array
  }

  findNodeMaxId (node: TreeData[]): number {
    const flatArray = this.flatJsonArray([], node)
    const flatArrayWithoutChildren: number[] = []
    flatArray.forEach(element => {
      if (element.id !== undefined) {
        flatArrayWithoutChildren.push(element.id)
      }
    })
    return Math.max(...flatArrayWithoutChildren)
  }

  findPosition (id: number, data: TreeData[]): number | undefined {
    for (let i = 0; i < data.length; i += 1) {
      if (id === data[i].id) {
        return i
      }
    }
    return undefined
  }

  findFatherCategory (id: number, data: TreeData[]): [TreeData, number] | false {
    for (let i = 0; i < data.length; i += 1) {
      const currentFather = data[i]
      for (let z = 0; z < currentFather.children.length; z += 1) {
        if (id === currentFather.children[z].id) {
          return [currentFather, z]
        }
      }
      for (let z = 0; z < currentFather.children.length; z += 1) {
        if (id !== currentFather.children[z].id) {
          const result = this.findFatherCategory(id, currentFather.children)
          if (result !== false) {
            return result
          }
        }
      }
    }
    return false
  }

  findParent (categories: TreeData[], childId: number): TreeData | null {
    for (const cat of categories) {
      if (cat.id === childId) {
        return null // Child category is the root category, no parent
      }
      if (cat.children.length > 0) {
        for (const child of cat.children) {
          if (child.id === childId) {
            return cat // Found parent category
          } else {
            const parent = this.findParent(child.children, childId)
            if (parent !== null) {
              return parent // Found parent category
            }
          }
        }
      }
    }
    return null // Child category not found
  }

  findCategoryById (id: number, nodes: TreeData[]): TreeData | null {
    for (const node of nodes) {
      if (node.id === id) {
        return node
      } else if (node.children.length > 0) {
        const result = this.findCategoryById(id, node.children)
        if (result !== null) {
          return result
        }
      }
    }
    return null
  }

  deleteCategory (id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `http://localhost:8080/api/v1/category/${id}`
    )
  }

  updateCategory (category: TreeData): Observable<ResponseTreeData> {
    if (category.id !== undefined) {
      return this.httpClient.patch<ResponseTreeData>(
        `http://localhost:8080/api/v1/category/${category.id}`,
        category
      )
    }
    return noPropertyError()
  }
}
