import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class TextSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.labelledSpeaker.getText(node, config)
            || (node.title
                || node.innerText
                || node.textContent // like svg
                || node.getAttribute("value") // like inputs
                || "").trim().replace(/\n+/g, ". ");
        return text ? `${text}.` : ``;
    }
}