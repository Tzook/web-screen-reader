import { AbstractSpeaker } from "./SpeakerInterface";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";
import { GetterByIds } from "../dom/GetterByIds";
import { TextSpeaker } from "./TextSpeaker";

export class LabelSpeaker extends AbstractSpeaker {
    constructor(private elementToTextMediator: ElementToTextMediator,
        private getterByIds: GetterByIds,
        private textSpeaker: TextSpeaker) { super(); }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.textSpeaker.getText(node, config);
        let forText = this.getForText(node, config);
        return `Label..` + (text ? ` ${text}.` : '') + forText;
    }

    protected getForText(node: HTMLElement, config: SpeakConfigInterface): string {
        let forText;
        if (!config.isRef) {
            let refFor = (node.getAttribute("for") || "").trim();
            if (refFor) {
                let elements = this.getterByIds.getElements([refFor]);
                if (elements.length > 0) {
                    // do not check ref for further elements, to avoid infinite label checks
                    let newConfig = Object.assign({}, config, { isRef: true });
                    forText = this.elementToTextMediator.getText(<HTMLElement>elements[0], newConfig);
                }
            }
        }
        return forText ? `The label is for: ${forText}` : ``;
    }
}