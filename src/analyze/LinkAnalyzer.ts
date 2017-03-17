import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class LinkAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let role = node.getAttribute("role");
        // if we have a role and it isn't link, then we shouldn't consider it a link
        let isLink = role === "link" || (node.localName === "a" && !role);
        return isLink;
    }
}