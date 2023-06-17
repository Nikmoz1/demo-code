import { Observable, throwError } from 'rxjs'

export function noPropertyError (): Observable<never> {
  return throwError(
    () => new Error('Something bad happened; no parameters provided.')
  )
}
