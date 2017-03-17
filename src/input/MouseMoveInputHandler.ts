import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractInputHandler } from "./AbstractInputHandler";
import { AbstractEventInputHandler } from "./AbstractEventInputHandler";

export class MouseMoveInputHandler extends AbstractEventInputHandler {
    protected eventHandler(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>, event: MouseEvent): void {
        this.handleEvent(analyzer, analyzeToSpeakMap, event);
    }

    protected getEventName(): string {
        return "mouseover";
    }
}