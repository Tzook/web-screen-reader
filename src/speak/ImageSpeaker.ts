import { SpeakerInterface } from "./SpeakerInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class ImageSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }
    
    public getText(node: HTMLElement): string {
        let text = this.labelledSpeaker.getText(node) || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}