import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";

export class LabelledSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let refLabel = node.getAttribute("aria-labelledby") || node.getAttribute("aria-describedby");
        if (refLabel) {

        }
        let text = node.getAttribute("aria-label");
        return text;
    }
}