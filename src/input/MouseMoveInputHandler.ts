import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractInputHandler } from "./AbstractInputHandler";
import { AbstractEventInputHandler } from "./AbstractEventInputHandler";

export class MouseMoveInputHandler extends AbstractEventInputHandler {
    protected eventHandler(event: MouseEvent): void {
        this.handleEvent(event);
    }

    protected getEventName(): string {
        return "mouseover";
    }
}