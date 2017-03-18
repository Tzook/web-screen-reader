import { AbstractSpeaker } from "./AbstractSpeaker";

export class TextSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        const text = node.getAttribute("aria-label") || node.title || (node.innerText || node.textContent || "").trim().replace(/\n+/g, ". ");
        return text ? `${text}.` : ``;
    }
}