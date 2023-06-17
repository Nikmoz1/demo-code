import {
  Component,
  Input
} from '@angular/core'

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
  @Input() name!: string
  @Input() disable: boolean = false
  @Input() myClass: string = 'default-button'
}
