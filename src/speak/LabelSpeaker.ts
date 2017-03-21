import { SpeakerInterface } from "./SpeakerInterface";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";
import { GetterByIds } from "../dom/GetterByIds";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { TextSpeaker } from "./TextSpeaker";

export class LabelSpeaker implements SpeakerInterface {
    constructor(private elementToTextMediator: ElementToTextMediator,
        private getterByIds: GetterByIds,
        private textSpeaker: TextSpeaker) { }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.textSpeaker.getText(node, config);
        let forText = this.getForText(node, config);
        return `Label..` + (text ? ` ${text}.` : '') + forText;
    }

    protected getForText(node: HTMLElement, config: SpeakConfigInterface): string {
        let forText;
        if (config.checkRef) {
            let refFor = (node.getAttribute("for") || "").trim();
            if (refFor) {
                let elements = this.getterByIds.getElements([refFor]);
                if (elements.length > 0) {
                    // do not check ref for further elements, to avoid infinite label checks
                    let newConfig = Object.assign({}, config, {checkRef: false}); 
                    forText = this.elementToTextMediator.getText(<HTMLElement>elements[0], newConfig);
                }
            }
        }
        return forText ? `The label is for: ${forText}` : ``;
    }
}