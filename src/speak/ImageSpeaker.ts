import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class ImageSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }
    
    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.labelledSpeaker.getText(node, config) || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}