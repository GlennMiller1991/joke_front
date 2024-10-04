import { NgClass, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    selector: 'button-component',
    templateUrl: './button.component.html',
    styleUrls:[ './base.component.css', './elevated.component.css', './flush.component.css'],
    imports: [
        NgClass, NgStyle,
    ]
})
export class ButtonComponent {
    @Input() baseType: 'flush' | 'elevated' = 'elevated'
    @Input() size: string = '7em'

    get classes() {
        return {
            flush: this.baseType === 'flush',
            elevated: this.baseType === 'elevated'
        }
    }

    get btnStyles() {
        return {
            height: this.size,
            width: this.size,
        }
    }
}