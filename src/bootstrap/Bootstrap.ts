import { AnalyzeToSpeakMapper } from "./AnalyzeToSpeakMapper";
import { ChainOfResponsibility } from "../patterns/chain-of-responsibility/ChainOfResponsibility";
import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { MouseMoveInputHandler } from "../input/MouseMoveInputHandler";
import { SpeechSynthesisUtteranceOutputHandler } from "../output/SpeechSynthesisUtteranceOutputHandler";
import { TabInputHandler } from "../input/TabInputHandler";
import { InputListGetter } from "./InputListGetter";

export class Bootstrap {
    init() {
        let analyzeToSpeakMap = new AnalyzeToSpeakMapper().getMap();
        let initialAnalyzer = new ChainOfResponsibility().makeChain(analyzeToSpeakMap.keys());

        let speechSynthesisUtteranceOutputHandler = new SpeechSynthesisUtteranceOutputHandler(window);
        speechSynthesisUtteranceOutputHandler.init();
        let inputList = new InputListGetter(window, speechSynthesisUtteranceOutputHandler).getList();
        for (let input of inputList) {
            input.enableInput(<AbstractAnalyzer>initialAnalyzer, analyzeToSpeakMap);
        }
    }
}