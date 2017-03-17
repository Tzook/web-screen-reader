import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ButtonAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.localName === "button";
    }

    protected getRole(): string {
        return "button";
    }
}