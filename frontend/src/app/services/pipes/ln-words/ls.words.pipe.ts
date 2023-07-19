import { Pipe, PipeTransform } from '@angular/core';
import { lnWords } from 'src/app/utilities/lnWords';

@Pipe({
  name: 'lnWords',
})
export class LnWordsPipe implements PipeTransform {
  transform(words: unknown, max = 22): string | null | undefined {
    return lnWords(words, max);
  }
}
