import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from "@angular/core";
import { ButtonComponent } from "../preloader/components/button/button.component";
import { RotatedButtonComponent } from "../preloader/components/rotated-button/rotated-button.component";
import { isPlatformBrowser, NgStyle } from "@angular/common";


type IEvent = 'mousedown' | 'mouseup'
type IOutput = 'stop' | 'play' | 'back' | 'forward'


@Component({
    standalone: true,
    selector: 'player-component',
    templateUrl: './player.component.html',
    styleUrl: './player.component.css',
    imports: [
        ButtonComponent, RotatedButtonComponent
    ]
})
export class PlayerComponent {
    activeBtn: 'back' | 'forward' | 'play' | undefined = undefined
    timer: number | undefined
    @Inject(PLATFORM_ID) platform_id!: Object
    @Output() onStatusChange = new EventEmitter<IOutput>()


    get isBrowser() {
        return isPlatformBrowser(this.platform_id)
    }

    onBack(hint: IEvent) {
        this.onActivityChange(hint, 'back')
    }

    onForward(hint: IEvent) {
        this.onActivityChange(hint, 'forward')
    }

    onPlay(hint: IEvent) {
        this.onActivityChange(hint, 'play')
    }

    get activity() {
        return {
            isBackActive: this.activeBtn === 'back',
            isForwardActive: this.activeBtn === 'forward',
            isPlayActive: this.activeBtn === 'play'
        }
    }


    onActivityChange(hint: 'mousedown' | 'mouseup', button: NonNullable<typeof this.activeBtn>) {
        const oldActiveBtn = this.activeBtn
        switch (hint) {
            case 'mousedown':
                if (this.activeBtn === button) {
                    this.activeBtn = undefined
                } else {
                    this.activeBtn = button as 'forward'
                    this.timer = performance.now()
                }
                break
            case 'mouseup':
                if (this.activeBtn !== button) return
                switch (button) {
                    case 'back':
                    case 'forward':
                        const playTime = performance.now()
                        if (playTime - this.timer! < 500) {
                            this.activeBtn = undefined
                        }
                        break
                    default:
                        break;
                }

        }

        if (oldActiveBtn !== this.activeBtn) {
            if (!this.activeBtn) {
                this.onStatusChange.emit('stop')
            } else {
                this.onStatusChange.emit(this.activeBtn)
            }
        }

    }
}