import { SpeakerInterface } from "./SpeakerInterface";
import { LabelledSpeaker } from "./LabelledSpeaker";

export class TextSpeaker implements SpeakerInterface {
    constructor(private labelledSpeaker: LabelledSpeaker) { }

    public getText(node: HTMLElement): string {
        let text = this.labelledSpeaker.getText(node)
            || (node.title
            || node.innerText
            || node.textContent // like svg
            || node.getAttribute("value") // like inputs
            || "").trim().replace(/\n+/g, ". ");
        return text ? `${text}.` : ``;
    }
}