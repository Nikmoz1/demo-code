import { Component, Input } from '@angular/core'
import {
  ControlContainer,
  type FormGroup,
  FormGroupDirective
} from '@angular/forms'

@Component({
  selector: 'app-datepicker-form',
  templateUrl: './datepicker-form.component.html',
  styleUrls: ['./datepicker-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DatepickerFormComponent {
  @Input() label!: string
  @Input() placeholder!: string
  @Input() myClass!: string
  @Input() fControlName!: string
  @Input() fGroup!: FormGroup
}
