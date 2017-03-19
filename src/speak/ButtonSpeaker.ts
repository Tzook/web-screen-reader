import { TextSpeaker } from "./TextSpeaker";

export class ButtonSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        let text = super.speak(node);
        return `Button..` + (text ? ` ${text}` : '');
    }
}