import { AbstractInputHandler } from "../input/AbstractInputHandler";
import { MouseMoveInputHandler } from "../input/MouseMoveInputHandler";
import { TabInputHandler } from "../input/TabInputHandler";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";
import { MutationObserverInputHandler } from "../input/MutationObserverInputHandler";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";
import { AbstractMutationHandler } from "../mutation-handlers/AbstractMutationHandler";

export class InputListGetter {
    constructor(private window: Window,
        private outputHandler: AbstractOutputHandler,
        private elementToTextMediator: ElementToTextMediator,
        private mutationHandler: AbstractMutationHandler) { }

    public getList(): AbstractInputHandler[] {
        return [
            new MouseMoveInputHandler(this.window, this.outputHandler, this.elementToTextMediator),
            new TabInputHandler(this.window, this.outputHandler, this.elementToTextMediator),
            new MutationObserverInputHandler(this.window, this.outputHandler, this.elementToTextMediator, this.mutationHandler),
        ];
    }
}