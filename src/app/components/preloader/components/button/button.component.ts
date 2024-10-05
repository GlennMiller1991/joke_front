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
    @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>
    isActive = false


    onMouseDown = () => {
        this.isActive = true
    }

    onMouseLeave = () => {
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