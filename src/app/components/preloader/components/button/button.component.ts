import { NgClass, NgStyle } from "@angular/common";
import { afterNextRender, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";

@Component({
    standalone: true,
    selector: 'button-component',
    templateUrl: './button.component.html',
    styleUrls: ['./base.component.css', './elevated.component.css', './flush.component.css'],
    imports: [
        NgClass, NgStyle,
    ]
})
export class ButtonComponent implements OnDestroy {
    @Input() baseType: 'flush' | 'elevated' = 'elevated'
    @Input() size: string = '7em'
    @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>
    isActive = false

    constructor() {
        afterNextRender(this.afterNextRender)
    }

    afterNextRender = async () => {
        this.buttonRef.nativeElement.addEventListener('mousedown', this.onMouseDown)
    }

    private onMouseDown = () => {
        console.log('onMouseDown')
        this.isActive = true
        this.buttonRef.nativeElement.addEventListener('mouseleave', this.onMouseLeave)
        document.addEventListener('mouseup', this.onMouseLeave)
        console.log(this.isActive)
    }

    private onMouseLeave = () => {
        this.isActive = false
        console.log(this.isActive)
        this.buttonRef.nativeElement.removeEventListener('mouseleave', this.onMouseLeave)
        document.removeEventListener('mouseup', this.onMouseLeave)
    }


    get classes() {
        return {
            flush: this.baseType === 'flush',
            elevated: this.baseType === 'elevated',
            active: this.isActive
        }
    }

    get btnStyles() {
        return {
            height: this.size,
            width: this.size,
        }
    }

    ngOnDestroy(): void {
        this.buttonRef.nativeElement.removeEventListener('mousedown', this.onMouseDown)
    }
}