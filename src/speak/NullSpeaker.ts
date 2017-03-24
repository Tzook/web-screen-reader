import { AbstractSpeaker } from "./SpeakerInterface";

export class NullSpeaker extends AbstractSpeaker {
    public getText(node: HTMLElement): string {
        return "";
    }
}