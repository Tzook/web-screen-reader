import { SpeakConfigInterface } from "./SpeakConfigInterface";

export interface SpeakerInterface {
    getText(node: HTMLElement, config: SpeakConfigInterface): string;
}