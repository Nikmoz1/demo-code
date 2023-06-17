import { Component } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSubMenuOpen = false
  toggleSubMenu (): void {
    this.isSubMenuOpen = !this.isSubMenuOpen
  }
}
