import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class SelectAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let isSelect = node.localName === "select";
        return isSelect;
    }

    protected getRole(): string {
        return "listbox";
    }
}