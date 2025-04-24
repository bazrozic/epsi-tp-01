import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appHighlight) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff9c4');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'normal');
    }
  }
}
