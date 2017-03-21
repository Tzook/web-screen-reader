import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { TextSpeaker } from "./TextSpeaker";

export class LinkSpeaker implements SpeakerInterface {
    constructor(private textSpeaker: TextSpeaker) { }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.textSpeaker.getText(node, config);
        return `Link..` + (text ? ` ${text}` : '');
    }
}