import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-textarea-form',
  templateUrl: './textarea-form.component.html',
  styleUrls: ['./textarea-form.component.scss']
})
export class TextareaFormComponent {
  @Input() label!: string
  @Input() placeholder!: string
  @Input() myClass!: string
  @Input() fGroup!: FormGroup
  @Input() fControlName!: string
}
