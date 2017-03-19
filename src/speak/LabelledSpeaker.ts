import { SpeakerInterface } from "./SpeakerInterface";

export class LabelledSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement): string {
        let text = node.getAttribute("aria-label");
        // * add aria-labelledby and aria-describedby
        return text;
    }
}