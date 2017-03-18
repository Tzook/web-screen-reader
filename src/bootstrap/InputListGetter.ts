import { AbstractInputHandler } from "../input/AbstractInputHandler";
import { MouseMoveInputHandler } from "../input/MouseMoveInputHandler";
import { TabInputHandler } from "../input/TabInputHandler";
import { AbstractOutputHandler } from "../output/AbstractOutputHandler";
import { MutationObserverInputHandler } from "../input/MutationObserverInputHandler";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractMutationHandler } from "../input/mutation-handlers/AbstractMutationHandler";

export class InputListGetter {
    constructor(private window: Window,
        private outputHandler: AbstractOutputHandler,
        private analyzer: AbstractAnalyzer, 
        private analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>,
        private mutationHandler: AbstractMutationHandler) { }

    public getList(): AbstractInputHandler[] {
        return [
            new MouseMoveInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap),
            new TabInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap),
            new MutationObserverInputHandler(this.window, this.outputHandler, this.analyzer, this.analyzeToSpeakMap, this.mutationHandler),
        ];
    }
}