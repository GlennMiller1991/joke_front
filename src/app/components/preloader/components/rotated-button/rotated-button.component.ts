import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
    standalone: true,
    selector: 'rotated-button-component',
    templateUrl: './rotated-button.component.html',
    styleUrl: './rotated-button.component.css',
    imports: [
        ButtonComponent,
    ]
})
export class RotatedButtonComponent extends ButtonComponent {

}