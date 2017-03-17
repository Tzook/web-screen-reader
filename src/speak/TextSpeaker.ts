import { AbstractSpeaker } from "./AbstractSpeaker";

export class TextSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        const text = node.getAttribute("aria-label") || node.innerText.trim().replace(/\n+/g, ". ");
        return text ? `${text}.` : ``;
    }
}