import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";

export abstract class AbstractInputHandler {
    constructor(protected window: Window,
        protected outputHandler: AbstractOutputHandler,
        protected analyzer: AbstractAnalyzer, 
        protected analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>) { }

    public abstract enableInput(): void;

    public abstract disableInput(): void;

    protected getSpeakText(element: HTMLElement): string {
        let usedAnalyzer = this.analyzer.handle(element);
        let speaker = this.analyzeToSpeakMap.get(usedAnalyzer);
        let speakText = speaker.getSpeak(element);
        return speakText;
    }
}