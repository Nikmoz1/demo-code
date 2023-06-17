import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { TreeData } from './tree-function.service'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment'

export interface LastChildren {
  categories: TreeData[]
}

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {
  categories: BehaviorSubject<TreeData[]> = new BehaviorSubject<TreeData[]>([])
  _categories!: TreeData[]
  constructor (private readonly httpClient: HttpClient) {}

  lastChildrens (): Observable<LastChildren> {
    return this.httpClient.get<LastChildren>(
      'http://localhost:8080/api/v1/category/all/last_children'
    )
  }

  load (): void {
    this.httpClient
      .get('http://localhost:8080/api/v1/category/all/trees')
      .subscribe(resp => {
        this._categories = this.changeImage((resp as LastChildren).categories)
        this.categories.next(this._categories)
      })
  }

  changeImage (categories: TreeData[]): TreeData[] {
    for (const cat of categories) {
      if (cat.image?.startsWith('/category')) {
        cat.image = environment.apiUrl + cat.image
      }
      if (cat.children.length > 0) {
        cat.children = this.changeImage(cat.children)
      }
    }
    return categories
  }
}
