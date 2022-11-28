import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIsOwnerMark]',
})
export class IsOwnerMarkDirective implements OnInit {
  @Input('appIsOwnerMark') ownerId: string | number = '';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    if (this.ownerId === localStorage.getItem('userId')) {
      this.renderer2.addClass(this.elementRef.nativeElement, 'owner-mark');
    }
  }
}
