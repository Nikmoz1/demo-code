import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ok-admin'
  isSubMenuOpen = false
  toggleSubMenu (): void {
    this.isSubMenuOpen = !this.isSubMenuOpen
  }
}
