import { Component, Input } from '@angular/core'
import {
  ControlContainer,
  type FormGroup,
  FormGroupDirective
} from '@angular/forms'

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class InputFormComponent {
  @Input() placeholder = ''
  @Input() type: string = 'string'
  @Input() fGroup!: FormGroup
  @Input() hint: string = ''
  @Input() label!: string

  @Input() myClass!: string
  @Input() fControlName!: string
}
