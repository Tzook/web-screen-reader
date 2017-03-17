import { TextSpeaker } from "./TextSpeaker";

export class ButtonSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        const text = super.speak(node);
        return `Button..` + (text ? ` ${text}` : '');
    }
}