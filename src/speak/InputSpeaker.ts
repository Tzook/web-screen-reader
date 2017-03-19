import { SpeakerInterface } from "./SpeakerInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class InputSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }

    public getText(node: HTMLInputElement): string {
        let text = this.labelledSpeaker.getText(node)
            || (node.name ? `${node.name}. ` : ``);
        return text;
    }
}