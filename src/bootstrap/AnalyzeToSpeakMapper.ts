import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";

import { LinkAnalyzer } from "../analyze/LinkAnalyzer";
import { LinkSpeaker } from "../speak/LinkSpeaker";
import { ButtonAnalyzer } from "../analyze/ButtonAnalyzer";
import { ButtonSpeaker } from "../speak/ButtonSpeaker";
import { TextAnalyzer } from "../analyze/TextAnalyzer";
import { TextSpeaker } from "../speak/TextSpeaker";
import { NullSpeaker } from "../speak/NullSpeaker";
import { TrueAnalyzer } from "../analyze/TrueAnalyzer";
import { HiddenAnalyzer } from "../analyze/HiddenAnalyzer";

export class AnalyzeToSpeakMapper {
    public getMap(): Map<AbstractAnalyzer, AbstractSpeaker> {
        // the order of the items is the order that nodes are being analyzed until one of them is truthy
        let map: Map<AbstractAnalyzer, AbstractSpeaker> = new Map();

        map.set(new HiddenAnalyzer(), new NullSpeaker());
        map.set(new LinkAnalyzer(), new LinkSpeaker());
        map.set(new ButtonAnalyzer(), new ButtonSpeaker());
        map.set(new TextAnalyzer(), new TextSpeaker());
        // wildcard - always last and will catch everything that wasn't handled
        map.set(new TrueAnalyzer(), new NullSpeaker()); 

        return map;
    }
}