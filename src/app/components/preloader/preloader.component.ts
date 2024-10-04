import { Component, Input } from "@angular/core";
import { ButtonComponent } from "./components/button/button.component";
import { RotatedButtonComponent } from "./components/rotated-button/rotated-button.component";

@Component({
    standalone: true,
    selector: 'preloader-component',
    templateUrl: './preloader.component.html',
    styleUrl: './preloader.component.css',
    imports: [
        ButtonComponent,
        RotatedButtonComponent,
    ]
})
export class PreloaderComponent {
    @Input()     size: string = '7rem'
    
}