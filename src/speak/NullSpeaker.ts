import { SpeakerInterface } from "./SpeakerInterface";

export class NullSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement): string {
        return "";
    }
}