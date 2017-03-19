import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { SpeakerInterface } from "../speak/SpeakerInterface";
import { AbstractInputHandler } from "./AbstractInputHandler";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";
import { AbstractMutationHandler } from "../mutation-handlers/AbstractMutationHandler";

export class MutationObserverInputHandler extends AbstractInputHandler {
    protected observer: MutationObserver;

    constructor(protected window: Window,
        protected outputHandler: AbstractOutputHandler,
        protected analyzer: AbstractAnalyzer,
        protected analyzeToSpeakMap: Map<AbstractAnalyzer, SpeakerInterface>,
        protected mutationHandler: AbstractMutationHandler) {
        super(window, outputHandler, analyzer, analyzeToSpeakMap);
    }

    public enableInput(): void {
        this.observer = new (<any>this.window).MutationObserver(this.mutationOccurred.bind(this));
        this.observer.observe(this.window.document, {
            childList: true, // modified children
            attributes: true, // modified attributes
            characterData: true, // modified text
            subtree: true, // observe entire tree as well
            attributeOldValue: true,
            characterDataOldValue: true,
        });
    }

    protected mutationOccurred(mutations: MutationRecord[]): void {
        let elementsModified: Set<HTMLElement> = new Set();
        for (let mutation of mutations) {
            this.mutationHandler.handle(mutation, elementsModified);
        }
        let hasSpoken = false;
        for (let element of elementsModified) {
            let speakText = this.getSpeakText(element);
            if (speakText) {
                if (!hasSpoken) {
                    this.outputHandler.abort();
                    this.outputHandler.output("Update: ");
                }
                hasSpoken = true;
                this.outputHandler.output(speakText);
            }
        }
    }

    public disableInput(): void {
        this.observer.disconnect();
    }
}