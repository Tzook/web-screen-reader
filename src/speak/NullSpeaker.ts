import { AbstractSpeaker } from "./AbstractSpeaker";

export class NullSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        return "";
    }
}