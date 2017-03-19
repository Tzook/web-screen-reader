import { AbstractEventInputHandler } from "./AbstractEventInputHandler";

const TAB_KEYCODE = 9;

export class TabInputHandler extends AbstractEventInputHandler {
    protected eventHandler(event: KeyboardEvent): void {
        if (event.which === TAB_KEYCODE) {
            this.handleEvent(event);
        }
    }

    protected getEventName(): string {
        return "keyup";
    }
}