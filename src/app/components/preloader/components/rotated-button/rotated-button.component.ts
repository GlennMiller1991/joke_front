import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { NgClass } from "@angular/common";

@Component({
    standalone: true,
    selector: 'rotated-button-component',
    templateUrl: './rotated-button.component.html',
    styleUrl: './rotated-button.component.css',
    imports: [
        ButtonComponent, NgClass,
    ]
})
export class RotatedButtonComponent extends ButtonComponent{
    angle = 0

    override onMouseDown(event: Event) {
        event.stopPropagation()
        super.onMouseDown(event)
    }

    override onMouseLeave(event: Event): void {
        event.stopPropagation()
        super.onMouseLeave(event)
    }


    onMouseMove(event: MouseEvent) {
        if (!this.isActive) return
        const node = event.currentTarget as HTMLDivElement
        if (!node) return
        const rect = node.getBoundingClientRect()
        
    }
}   