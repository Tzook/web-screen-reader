import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class TrueAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        // this should be a wildcard - always returns yes if it gets here
        return true;
    }

    protected getRole(): string {
        return "";
    }
} 