import { NgClass, NgStyle } from "@angular/common";
import { afterNextRender, afterRender, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from "@angular/core";

@Component({
    standalone: true,
    selector: 'button-component',
    templateUrl: './button.component.html',
    styleUrls: ['./base.component.css', './elevated.component.css', './flush.component.css'],
    imports: [
        NgClass, NgStyle,
    ]
})
export class ButtonComponent {
    @Input() baseType: 'flush' | 'elevated' = 'elevated'
    @Input() size: string = '7em'
    @Input() isDisabled: boolean = false
    @Input() isActive = false
    @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>


    onMouseDown(event: Event) {
        if (this.isDisabled) return
        this.isActive = true
    }

    onMouseLeave(event: Event) {
        if (this.isDisabled) return
        this.isActive = false
    }


    get classes() {
        return {
            flush: this.baseType === 'flush',
            elevated: this.baseType === 'elevated',
            active: this.isActive
        }
    }

}