import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class LabelAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.localName === "label";
    }

    protected getRole(): string {
        return "label"; // label actually is not officially supported yet
    }
}