import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'validatorMessage',
})
export class ValidatorMessagePipe implements PipeTransform {
  transform(value: unknown, fields: 'email' | 'password'): string {
    const controls = value as { [key: string]: AbstractControl<any, any> };
    switch (fields) {
      case 'email':
        if (controls[fields].invalid) return 'Por favor digite um email válido';
        break;
      case 'password':
        if (controls[fields].invalid) return 'Por favor digite uma senha';
        break;
    }
    return '';
    // console.log(controls[fields]);
  }
}
