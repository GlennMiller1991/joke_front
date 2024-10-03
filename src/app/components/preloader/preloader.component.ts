import { Component } from "@angular/core";
import { ButtonComponent } from "./components/button.component";

@Component({
    standalone: true,
    selector: 'preloader-component',
    templateUrl: './preloader.component.html',
    styleUrl: './preloader.component.css',
    imports: [
        ButtonComponent
    ]
})
export class PreloaderComponent {
    
}