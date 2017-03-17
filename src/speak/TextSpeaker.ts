import { AbstractSpeaker } from "./AbstractSpeaker";

export class TextSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        return `${node.getAttribute("aria-label") || node.innerText.replace(/\n+/g, ". ")}.`;
    }
}