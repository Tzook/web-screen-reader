import { AbstractOutputHandler } from "../output/AbstractOutputHandler";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";

export abstract class AbstractInputHandler {
    constructor(protected window: Window,
        protected outputHandler: AbstractOutputHandler,
        protected elementToTextMediator: ElementToTextMediator) { }

    public abstract enableInput(): void;

    public abstract disableInput(): void;

    protected getSpeakText(element: HTMLElement): string {
        let text = this.elementToTextMediator.getText(element, { isRef: false });
        return text;
    }
}