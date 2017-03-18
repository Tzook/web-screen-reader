import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ButtonAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let isButton = node.localName === "button" || node.localName === "a" 
            || !!node.onclick || !!node.getAttribute("ng-click")
            || this.isButtonString(node.className) || this.isButtonString(node.id);
        return isButton;
    }

    protected getRole(): string {
        return "button";
    }

    protected isButtonString(value: string): boolean {
        return /button|btn|click/.test(value) 
    }
}