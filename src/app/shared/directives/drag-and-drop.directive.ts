import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, OnChanges, OnDestroy } from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { BarTypes } from '#application';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true,
})
export class DragAndDropDirective implements OnChanges, OnDestroy {
  @Input() public type!: BarTypes;
  @Input() public isStartDrag!: boolean;
  @Output() public handleDrop = new EventEmitter();

  @Input() public x!: number;
  @Input() public y!: number;
  @Input() public width!: number;
  @Input() public height!: number;

  private offsetX?: number;
  private offsetY?: number;

  private _subscriptionMove?: Subscription;
  private _subscriptionUp?: Subscription;
  private _subscriptionResize?: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this._subscriptionResize = fromEvent(window, 'resize').subscribe(() => this.setStylePosition(this.y, this.x));
  }

  ngOnChanges() {
    this.setStylePosition(this.y, this.x);
    if (this.isStartDrag) {
      this._subscriptionMove = fromEvent<MouseEvent>(document, 'mousemove').subscribe((e) => this.nextMouseMove(e));
      this._subscriptionUp = fromEvent<MouseEvent>(document, 'mouseup').subscribe((e) => this.nextMouseUp(e));
    } else {
      this.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
    this._subscriptionResize?.unsubscribe();
  }

  private setStylePosition(top: number, left: number) {
    const maxTop = window.innerHeight - this.height - 2;
    const maxLeft = window.innerWidth - this.width - 2;
    this.renderer.setStyle(this.el.nativeElement, 'left', (left > maxLeft ? maxLeft : left < 2 ? 2 : left) + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'top', (top > maxTop ? maxTop : top < 2 ? 2 : top) + 'px');
  }

  private nextMouseMove(e: MouseEvent) {
    if (this.offsetX === undefined) {
      this.offsetX = e.clientX;
    }
    if (this.offsetY === undefined) {
      this.offsetY = e.clientY;
    }
    const top = e.clientY - this.offsetY + this.y;
    const left = e.clientX - this.offsetX + this.x;
    this.setStylePosition(top, left);
  }

  private nextMouseUp(e: MouseEvent) {
    const result = { x: this.x, y: this.y };
    if (this.offsetX && this.offsetY) {
      result.x += e.clientX - this.offsetX;
      result.y += e.clientY - this.offsetY;
    }
    this.handleDrop.emit(result);
    this.offsetX = undefined;
    this.offsetY = undefined;
  }

  private unsubscribe() {
    this._subscriptionMove?.unsubscribe();
    this._subscriptionUp?.unsubscribe();
  }
}
