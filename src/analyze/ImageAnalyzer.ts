import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ImageAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.localName === "img" || this.hasImageUrl(node.style.backgroundImage) || this.hasImageUrl(node.style.background);
    }

    protected getRole(): string {
        return "img";
    }

    protected hasImageUrl(style: string): boolean {
        return style.indexOf("url(") !== -1;
    }
}