import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnWordsPipe } from './ln-words/ls.words.pipe';

@NgModule({
  declarations: [LnWordsPipe],
  imports: [CommonModule],
  exports: [LnWordsPipe],
})
export class PipeModule {}
