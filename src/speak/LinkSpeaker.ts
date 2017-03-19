import { TextSpeaker } from "./TextSpeaker";

export class LinkSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        let text = super.speak(node);
        return `Link..` + (text ? ` ${text}` : '');
    }
}