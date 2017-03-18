import { TextSpeaker } from "./TextSpeaker";

export class LinkSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        const text = super.speak(node);
        return `Link..` + (text ? ` ${text}` : '');
    }
}