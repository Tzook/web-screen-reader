import { AnalyzeToSpeakMapper } from "./AnalyzeToSpeakMapper";
import { ChainMaker } from "../patterns/chain-of-responsibility/ChainMaker";
import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { SpeechSynthesisUtteranceOutputHandler } from "../output/SpeechSynthesisUtteranceOutputHandler";
import { InputListGetter } from "./InputListGetter";
import { MutationHandlersListGetter } from "./MutationHandlersListGetter";
import { AbstractMutationHandler } from "../mutation-handlers/AbstractMutationHandler";

export class Bootstrap {
    init() {
        let speechSynthesisUtteranceOutputHandler = new SpeechSynthesisUtteranceOutputHandler(window);
        speechSynthesisUtteranceOutputHandler.init();

        let analyzeToSpeakMap = new AnalyzeToSpeakMapper().getMap();
        let chainMaker = new ChainMaker();
        let initialAnalyzer = <AbstractAnalyzer>chainMaker.makeChain(analyzeToSpeakMap.keys());
        let initialMutationHandler = <AbstractMutationHandler>chainMaker.makeChain(new MutationHandlersListGetter().getList());

        let inputList = new InputListGetter(window, speechSynthesisUtteranceOutputHandler, initialAnalyzer, analyzeToSpeakMap, initialMutationHandler).getList();
        for (let input of inputList) {
            input.enableInput();
        }
    }
}