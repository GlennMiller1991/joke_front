import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { NgClass, NgStyle } from "@angular/common";
import { Angle, AngleUnits, IPoint2, Point } from "@fbltd/math";

@Component({
    standalone: true,
    selector: 'rotated-button-component',
    templateUrl: './rotated-button.component.html',
    styleUrl: './rotated-button.component.css',
    imports: [
        ButtonComponent, NgClass, NgStyle
    ]
})
export class RotatedButtonComponent extends ButtonComponent {
    _angle = 0

    override onMouseDown(event: Event) {
        event.stopPropagation()
        super.onMouseDown(event)
        this.onMouseMove(event as MouseEvent)
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
        const center: IPoint2 = [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2]
        const mp: IPoint2 = [event.clientX, event.clientY]
        this._angle = Angle.ofPoint(Point.dif(mp, center))
    }

    get angle() {
        return Angle.toCSS(this._angle, AngleUnits.Deg)
    }
}   