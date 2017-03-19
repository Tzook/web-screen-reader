import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { SpeakerInterface } from "../speak/SpeakerInterface";

import { LinkAnalyzer } from "../analyze/LinkAnalyzer";
import { LinkSpeaker } from "../speak/LinkSpeaker";
import { ButtonAnalyzer } from "../analyze/ButtonAnalyzer";
import { ButtonSpeaker } from "../speak/ButtonSpeaker";
import { TextAnalyzer } from "../analyze/TextAnalyzer";
import { TextSpeaker } from "../speak/TextSpeaker";
import { NullSpeaker } from "../speak/NullSpeaker";
import { TrueAnalyzer } from "../analyze/TrueAnalyzer";
import { HiddenAnalyzer } from "../analyze/HiddenAnalyzer";
import { ImageAnalyzer } from "../analyze/ImageAnalyzer";
import { ImageSpeaker } from "../speak/ImageSpeaker";
import { CheckboxAnalyzer } from "../analyze/CheckboxAnalyzer";
import { CheckboxSpeaker } from "../speak/CheckboxSpeaker";

export class AnalyzeToSpeakMapper {
    public getMap(): Map<AbstractAnalyzer, SpeakerInterface> {
        // the order of the items is the order that nodes are being analyzed until one of them is truthy
        let map: Map<AbstractAnalyzer, SpeakerInterface> = new Map();

        let nullSpeaker = new NullSpeaker();
        let textSpeaker = new TextSpeaker();
        map.set(new HiddenAnalyzer(), nullSpeaker);
        map.set(new LinkAnalyzer(), new LinkSpeaker(textSpeaker));
        map.set(new ButtonAnalyzer(), new ButtonSpeaker(textSpeaker));
        map.set(new ImageAnalyzer(window), new ImageSpeaker());
        map.set(new CheckboxAnalyzer(), new CheckboxSpeaker());
        map.set(new TextAnalyzer(), textSpeaker);
        // wildcard - always last and will catch everything that wasn't handled
        map.set(new TrueAnalyzer(), nullSpeaker);

        return map;
    }
}