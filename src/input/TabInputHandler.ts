import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractEventInputHandler } from "./AbstractEventInputHandler";

const TAB_KEYCODE = 9;

export class TabInputHandler extends AbstractEventInputHandler {
    protected eventHandler(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>, event: KeyboardEvent): void {
        if (event.which === TAB_KEYCODE) {
            this.handleEvent(analyzer, analyzeToSpeakMap, event);
        }
    }

    protected getEventName(): string {
        return "keyup";
    }
}