import { NgClass, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    selector: 'button-component',
    templateUrl: './button.component.html',
    styleUrl: './button.component.css',
    imports: [
        NgClass, NgStyle,
    ]
})
export class ButtonComponent {
    @Input() baseType: 'flush' | 'elevated' = 'elevated'
    @Input() size: string = '7em'

    get classes() {
        return {
            btn: true,
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