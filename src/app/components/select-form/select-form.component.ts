import { Component, Input } from '@angular/core'
import { type FormGroup } from '@angular/forms'

export interface Options {
  value: string | number
  name: string
}
@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss']
})
export class SelectFormComponent {
  @Input() label!: string
  @Input() options!: Options[]
  @Input() myClass!: string
  @Input() fGroup!: FormGroup
  @Input() fControlName!: string
}
