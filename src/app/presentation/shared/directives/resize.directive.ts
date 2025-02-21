import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { BarTypes } from '../../../core/application';

@Directive({
  selector: '[appResize]',
  standalone: true
})
export class ResizeDirective {

  @Input() public type!: BarTypes;
  @Input() public isStartResize!: boolean;
  @Output() public handleEndResize = new EventEmitter();

  @Input() public width!: number;
  @Input() public height!: number;

  private offsetX?: number;
  private offsetY?: number;

  private _subscriptionMove?: Subscription;
  private _subscriptionUp?: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.setStyleSzie(this.height, this.width);
    if (this.isStartResize) {
      this._subscriptionMove = fromEvent<MouseEvent>(document, 'mousemove').subscribe(e => this.nextMouseMove(e));
      this._subscriptionUp = fromEvent<MouseEvent>(document, 'mouseup').subscribe(e => this.nextMouseUp(e));
    } else {
      this.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private setStyleSzie(height: number, width : number) {
    this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', height + 'px');
  }

  private nextMouseMove(e: MouseEvent) {
    if (this.offsetX === undefined) { this.offsetX = e.clientX }
    if (this.offsetY === undefined) { this.offsetY = e.clientY }
    const height = (e.clientY - this.offsetY + this.height);
    const width = (e.clientX - this.offsetX + this.width);
    this.setStyleSzie(height, width);
  }

  private nextMouseUp(e: MouseEvent) {
    const result = { width: this.width, height: this.height };
    if (this.offsetX && this.offsetY) {
      result.width += e.clientX - this.offsetX;
      result.height += e.clientY - this.offsetY;
    }
    this.handleEndResize.emit(result);
    this.offsetX = undefined;
    this.offsetY = undefined;
  }

  private unsubscribe() {
    this._subscriptionMove?.unsubscribe();
    this._subscriptionUp?.unsubscribe();
  }

}
