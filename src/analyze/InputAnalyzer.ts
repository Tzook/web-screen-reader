import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class InputAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.localName === "input";
    }

    protected getRole(): string {
        return "textbox";
    }
}