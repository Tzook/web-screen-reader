import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class LinkAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.localName === "a";
    }

    protected getRole(): string {
        return "link";
    }
}