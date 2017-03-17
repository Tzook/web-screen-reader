import { AbstractInputHandler } from "../input/AbstractInputHandler";
import { MouseMoveInputHandler } from "../input/MouseMoveInputHandler";
import { TabInputHandler } from "../input/TabInputHandler";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";

export class InputListGetter {
    constructor(private window: Window,
        private outputHandler: AbstractOutputHandler) { }

    public getList(): AbstractInputHandler[] {
        return [
            new MouseMoveInputHandler(this.window, this.outputHandler),
            new TabInputHandler(this.window, this.outputHandler),
        ];
    }
}