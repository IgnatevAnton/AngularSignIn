import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { BarTypes } from '@application';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true,
})
export class DragAndDropDirective {

  @Input() public type!: BarTypes;
  @Input() public isStartDrag!: boolean;
  @Output() public handleDrop = new EventEmitter();

  @Input() public x!: number;
  @Input() public y!: number;

  private offsetX?: number;
  private offsetY?: number;

  private _subscriptionMove?: Subscription;
  private _subscriptionUp?: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.setStylePosition(this.y, this.x);
    if (this.isStartDrag) {
      this._subscriptionMove = fromEvent<MouseEvent>(document, 'mousemove').subscribe(e => this.nextMouseMove(e));
      this._subscriptionUp = fromEvent<MouseEvent>(document, 'mouseup').subscribe(e => this.nextMouseUp(e));
    } else {
      this.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private setStylePosition(top: number, right: number) {
    this.renderer.setStyle(this.el.nativeElement, 'right', right * -1 + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'top', top + 'px');
  }

  private nextMouseMove(e: MouseEvent) {
    if (this.offsetX === undefined) { this.offsetX = e.clientX }
    if (this.offsetY === undefined) { this.offsetY = e.clientY }
    const top = (e.clientY - this.offsetY + this.y);
    const right = (e.clientX - this.offsetX + this.x);
    this.setStylePosition(top, right);
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
