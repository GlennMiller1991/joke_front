import { Component } from "@angular/core";
import { ButtonComponent } from "../preloader/components/button/button.component";
import { RotatedButtonComponent } from "../preloader/components/rotated-button/rotated-button.component";


type IEvent = 'mousedown' | 'mouseup'

@Component({
    standalone: true,
    selector: 'player-component',
    templateUrl: './player.component.html',
    styleUrl: './player.component.css',
    imports: [
        ButtonComponent, RotatedButtonComponent,
    ]
})
export class PlayerComponent {
    activeBtn: 'back' | 'forward' | 'play' | undefined = undefined
    timer: number | undefined


    onBack(hint: IEvent) {
        this.onActivityChange(hint, 'back')
    }

    onForward(hint: IEvent) {
        this.onActivityChange(hint, 'forward')
    }

    onPlay(hint: IEvent) {
        switch (hint) {
            case 'mousedown':
                this.activeBtn = this.activeBtn === 'play' ? undefined : 'play'
        }
    }

    get activity() {
        return {
            isBackActive: this.activeBtn === 'back',
            isForwardActive: this.activeBtn === 'forward',
            isPlayActive: this.activeBtn === 'play'
        }
    }

    onActivityChange(hint: 'mousedown' | 'mouseup', button: NonNullable<Omit<typeof this.activeBtn, 'play'>>) {
        switch (hint) {
            case 'mousedown':
                if (this.activeBtn === button) {
                    this.activeBtn = undefined
                } else {
                    this.activeBtn = button as 'forward'
                    this.timer = Date.now()
                }
                break
            case 'mouseup':
                if (this.activeBtn !== button) return
                const playTime = Date.now()
                if (playTime - this.timer! < 500) {
                    this.activeBtn = this.activeBtn === button ? undefined : button as 'forward'
                }
        }
    }
}