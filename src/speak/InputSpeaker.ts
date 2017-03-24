import { AbstractSpeaker } from "./SpeakerInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class InputSpeaker extends AbstractSpeaker {
    constructor(private labelledSpeaker: LabelledSpeaker) { super() }

    public getText(node: HTMLInputElement, config: SpeakConfigInterface): string {
        let text = this.labelledSpeaker.getText(node, config)
            || (node.name ? `${node.name}.` : ``);
        return text;
    }
}