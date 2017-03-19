import { SpeakerInterface } from "./SpeakerInterface";
import { TextSpeaker } from "./TextSpeaker";

export class ButtonSpeaker implements SpeakerInterface {
    constructor(private textSpeaker: TextSpeaker) { }

    public getText(node: HTMLElement): string {
        let text = this.textSpeaker.getText(node);
        return `Button..` + (text ? ` ${text}` : '');
    }
}