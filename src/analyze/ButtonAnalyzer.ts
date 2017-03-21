import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ButtonAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let isButton = node.localName === "button" || node.localName === "a"
            || this.isInputButton(node)
            || !!node.onclick
            || !!node.getAttribute("ng-click") // angular leaves trace - unfortunately react nor vue do that
            || this.isButtonString(node.className) || this.isButtonString(node.id);
        return isButton;
    }

    protected getRole(): string {
        return "button";
    }

    protected isInputButton(node: HTMLElement): boolean {
        let isButton = false;
        if (node.localName === "input") {
            let type = (<HTMLInputElement>node).type;
            isButton = type === "button" || type === "submit";
        }
        return isButton;
    }

    protected isButtonString(value: string): boolean {
        return /button|btn|click/i.test(value)
    }
}