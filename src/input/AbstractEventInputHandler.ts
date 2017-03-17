import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractInputHandler } from "./AbstractInputHandler";

export abstract class AbstractEventInputHandler extends AbstractInputHandler {

    public enableInput(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>): void {
        this.eventHandler = this.eventHandler.bind(this, analyzer, analyzeToSpeakMap);
        this.window.addEventListener(this.getEventName(), <any>this.eventHandler);
    }

    public disableInput(): void {
        this.window.removeEventListener(this.getEventName(), <any>this.eventHandler);
    }

    protected handleEvent(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>, event: UIEvent): void {
        let srcElement = <HTMLElement>event.srcElement;

        let usedAnalyzer = analyzer.handle(srcElement);
        let speaker = analyzeToSpeakMap.get(usedAnalyzer);
        let speak = speaker.getSpeak(srcElement);
        if (speak) {
            this.outputHandler.output(speak);
        }
    }

    protected abstract getEventName(): string;

    protected abstract eventHandler(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>, event: UIEvent): void;
}