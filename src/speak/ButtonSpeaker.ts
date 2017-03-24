import { AbstractSpeaker } from "./SpeakerInterface";
import { TextSpeaker } from "./TextSpeaker";

export class ButtonSpeaker extends AbstractSpeaker {
    constructor(private textSpeaker: TextSpeaker) { super() }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.textSpeaker.getText(node, config);
        return `Button..` + (text ? ` ${text}` : '');
    }
}