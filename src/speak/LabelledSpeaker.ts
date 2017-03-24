import { AbstractSpeaker } from "./SpeakerInterface";
import { ElementToTextMediator } from "../mediator/ElementToTextMediator";
import { GetterByIds } from "../dom/GetterByIds";

export class LabelledSpeaker extends AbstractSpeaker {
    constructor(private elementToTextMediator: ElementToTextMediator,
        private getterByIds: GetterByIds) { super(); }

    public getText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = this.getRefText(node, config)
        if (!text) {
            text = node.getAttribute("aria-label");
            text = text ? `${text}.` : ``;
        }
        return text;
    }

    protected getRefText(node: HTMLElement, config: SpeakConfigInterface): string {
        let text = "";
        if (!config.isRef) {
            let refLabel = (node.getAttribute("aria-labelledby") || node.getAttribute("aria-describedby") || "").trim();
            if (refLabel) {
                let ids = refLabel.split(/\s+/);
                let elements = this.getterByIds.getElements(ids);
                let newConfig = Object.assign({}, config, { isRef: true });
                // do not check ref for further elements, to avoid infinite label checks
                for (let element of elements) {
                    let elementText = this.elementToTextMediator.getText(<HTMLElement>element, newConfig);
                    if (elementText) {
                        text += `${elementText}.`
                    }
                }
            }
        }
        return text;
    }
}