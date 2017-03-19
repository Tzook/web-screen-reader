import { SpeakerInterface } from "./SpeakerInterface";
import { TextSpeaker } from "./TextSpeaker";

export class LinkSpeaker implements SpeakerInterface {
    constructor(private textSpeaker: TextSpeaker) { }

    public getText(node: HTMLElement): string {
        let text = this.textSpeaker.getText(node);
        return `Link..` + (text ? ` ${text}` : '');
    }
}