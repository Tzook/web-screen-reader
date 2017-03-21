import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";

export class NullSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        return "";
    }
}