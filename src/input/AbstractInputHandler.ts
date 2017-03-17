import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";

export abstract class AbstractInputHandler {
    constructor(protected window: Window,
        protected outputHandler: AbstractOutputHandler) { }

    public abstract enableInput(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>): void;

    public abstract disableInput(): void;
}