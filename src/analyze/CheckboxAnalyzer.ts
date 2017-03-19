import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class CheckboxAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let isCheckbox = node.localName === "input" && node.getAttribute("type") === "checkbox";
        return isCheckbox;
    }

    protected getRole(): string {
        return "checkbox";
    }
}