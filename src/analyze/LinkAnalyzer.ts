import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class LinkAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let isLink = node.localName === "a" && !/javascript:|^#?$/.test(node.getAttribute("href") || "");
        return isLink;
    }

    protected getRole(): string {
        return "link";
    }
}