import { AnalyzeToSpeakMapper } from "./AnalyzeToSpeakMapper";
import { ChainMaker } from "../chain-of-responsibility/ChainMaker";
import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { SpeechSynthesisUtteranceOutputHandler } from "../output/SpeechSynthesisUtteranceOutputHandler";
import { InputListGetter } from "./InputListGetter";
import { MutationHandlersListGetter } from "./MutationHandlersListGetter";
import { AbstractMutationHandler } from "../mutation-handlers/AbstractMutationHandler";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";
import { GetterByIds } from "../dom/GetterByIds";

export class Bootstrap {
    init() {
        let speechSynthesisUtteranceOutputHandler = new SpeechSynthesisUtteranceOutputHandler(window);
        speechSynthesisUtteranceOutputHandler.init();

        let elementToTextMediator = new ElementToTextMediator();
        let analyzeToSpeakMap = new AnalyzeToSpeakMapper(elementToTextMediator, new GetterByIds(document)).getMap();
        let chainMaker = new ChainMaker();
        let initialAnalyzer = <AbstractAnalyzer>chainMaker.makeChain(analyzeToSpeakMap.keys());
        let initialMutationHandler = <AbstractMutationHandler>chainMaker.makeChain(new MutationHandlersListGetter().getList());
        elementToTextMediator.init(initialAnalyzer, analyzeToSpeakMap);

        let inputList = new InputListGetter(window, speechSynthesisUtteranceOutputHandler, elementToTextMediator, initialMutationHandler).getList();
        for (let input of inputList) {
            input.enableInput();
        }
    }
}