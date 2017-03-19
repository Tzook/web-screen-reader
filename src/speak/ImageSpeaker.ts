import { SpeakerInterface } from "./SpeakerInterface";

export class ImageSpeaker implements SpeakerInterface {
    public getText(node: HTMLElement): string {
        let text = node.getAttribute("aria-label") || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}