import { SpeakerInterface } from "./SpeakerInterface";

export class TextSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement): string {
        let text = (node.getAttribute("aria-label")
            || node.title
            || node.innerText
            || node.textContent // like svg
            || node.getAttribute("value") // like inputs
        || "").trim().replace(/\n+/g, ". ");
        return text ? `${text}.` : ``;
    }
}