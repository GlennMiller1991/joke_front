import { NgClass, NgStyle } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

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
    localActivity = false
    @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>
    @Output() onPress = new EventEmitter<'mousedown' | 'mouseup'>()

    onMouseDown(event: Event) {
        if (this.isDisabled) return
        this.localActivity = true
        this.onPress.emit('mousedown')
    }

    onMouseLeave(event: Event) {
        if (this.isDisabled) return
        this.localActivity = false
        this.onPress.emit('mouseup')
    }

    get totalActivity() {
        return this.localActivity || this.isActive
    }


    get classes() {
        return {
            flush: this.baseType === 'flush',
            elevated: this.baseType === 'elevated',
            active: this.totalActivity
        }
    }

}