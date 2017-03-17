import { TextSpeaker } from "./TextSpeaker";

export class LinkSpeaker extends TextSpeaker {
    protected speak(node: HTMLElement): string {
        const href = node.getAttribute("href");
        const suffix = href ? ` The URL is ${href}.` : "";
        return `Link.. ${super.speak(node)}${suffix}`;
    }
}