import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format',
  standalone: true
})
export class FormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    let formatted = value.replace(/_/g, ' ');
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
    return formatted;
  }
}