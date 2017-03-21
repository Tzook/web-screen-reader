export class GetterByIds {
    constructor(private document: Document) { }

    public getElements(ids: string[]): NodeList | HTMLElement[] {
        let idString = ids.join(",#");
        idString = idString ? `#${idString}` : "";
        try {
            return this.document.querySelectorAll(idString);
        } catch (e) {
            // DOMException: must have had an invalid selector. go through the elements one by one instead 
            let list = [];
            for (let id of ids) {
                let element = this.document.getElementById(id);
                if (element) {
                    list.push(element);
                }
            }
            return list;
        }
    }
}