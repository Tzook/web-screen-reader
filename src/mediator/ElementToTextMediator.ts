import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { SpeakerInterface } from "../speak/SpeakerInterface";
import { SpeakConfigInterface } from "../speak/SpeakConfigInterface";

export class ElementToTextMediator {
    protected analyzer: AbstractAnalyzer;
    protected analyzeToSpeakMap: Map<AbstractAnalyzer, SpeakerInterface>;

    public init(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, SpeakerInterface>) {
        this.analyzer = analyzer;
        this.analyzeToSpeakMap = analyzeToSpeakMap;
    }

    public getText(element: HTMLElement, config: SpeakConfigInterface): string {
        let usedAnalyzer = this.analyzer.handle(element);
        let speaker = this.analyzeToSpeakMap.get(usedAnalyzer);
        let speakText = speaker.getText(element, config);
        return speakText;
    }
}