import { TextSpeaker } from "./TextSpeaker";

export class ButtonSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        return `Button.. ${super.speak(node)}`;
    }
}