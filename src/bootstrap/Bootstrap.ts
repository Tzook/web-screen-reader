import { AnalyzeToSpeakMapper } from "./AnalyzeToSpeakMapper";
import { ChainOfResponsibility } from "../patterns/chain-of-responsibility/ChainOfResponsibility";
import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { MouseMoveInputHandler } from "../input/MouseMoveInputHandler";
import { SpeechSynthesisUtteranceOutputHandler } from "../output/SpeechSynthesisUtteranceOutputHandler";
import { TabInputHandler } from "../input/TabInputHandler";
import { InputListGetter } from "./InputListGetter";
import { MutationHandlersListGetter } from "./MutationHandlersListGetter";
import { AbstractMutationHandler } from "../input/mutation-handlers/AbstractMutationHandler";

export class Bootstrap {
    init() {
        let speechSynthesisUtteranceOutputHandler = new SpeechSynthesisUtteranceOutputHandler(window);
        speechSynthesisUtteranceOutputHandler.init();

        let analyzeToSpeakMap = new AnalyzeToSpeakMapper().getMap();
        let chainOfResponsibility = new ChainOfResponsibility();
        let initialAnalyzer = <AbstractAnalyzer>chainOfResponsibility.makeChain(analyzeToSpeakMap.keys());
        let initialMutationHandler = <AbstractMutationHandler>chainOfResponsibility.makeChain(new MutationHandlersListGetter().getList());

        let inputList = new InputListGetter(window, speechSynthesisUtteranceOutputHandler, initialAnalyzer, analyzeToSpeakMap, initialMutationHandler).getList();
        for (let input of inputList) {
            input.enableInput();
        }
    }
}