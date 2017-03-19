import { AbstractSpeaker } from "./AbstractSpeaker";

export class ImageSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLElement): string {
        let text = node.getAttribute("aria-label") || node.title || (<HTMLImageElement>node).alt;
        return `Image..` + (text ? ` ${text}.` : ``);
    }
}