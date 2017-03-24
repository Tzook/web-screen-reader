import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/SpeakerInterface";

export class ElementToTextMediator {
    protected analyzer: AbstractAnalyzer;
    protected analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>;

    public init(analyzer: AbstractAnalyzer, analyzeToSpeakMap: Map<AbstractAnalyzer, AbstractSpeaker>) {
        this.analyzer = analyzer;
        this.analyzeToSpeakMap = analyzeToSpeakMap;
    }

    public getText(element: HTMLElement, config: SpeakConfigInterface): string {
        let usedAnalyzer = this.analyzer.handle(element, config);
        let speaker = this.analyzeToSpeakMap.get(usedAnalyzer);
        let speakText = speaker.getText(element, config);
        return speakText;
    }
}