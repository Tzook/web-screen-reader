import { AbstractSpeaker } from "./SpeakerInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class ImageSpeaker extends AbstractSpeaker {
    constructor(private labelledSpeaker: LabelledSpeaker) { super() }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.labelledSpeaker.getText(node, config) || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}