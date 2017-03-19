import { AbstractMutationHandler } from "../mutation-handlers/AbstractMutationHandler";
import { AddedNodesMutationHandler } from "../mutation-handlers/AddedNodesMutationHandler";
import { TextMutationHandler } from "../mutation-handlers/TextMutationHandler";

export class MutationHandlersListGetter {
    public getList(): AbstractMutationHandler[] {
        return [
            new AddedNodesMutationHandler(),
            new TextMutationHandler(),
        ];
    }
}