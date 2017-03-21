import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class InputSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }

    public getText(node: HTMLInputElement, config: SpeakConfigInterface): string {
        let text = this.labelledSpeaker.getText(node, config)
            || (node.name ? `${node.name}.` : ``);
        return text;
    }
}