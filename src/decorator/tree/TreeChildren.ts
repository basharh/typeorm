import { getMetadataArgsStorage, RelationOptions } from "../../";
import { RelationMetadataArgs } from "../../metadata-args/RelationMetadataArgs";

/**
 * Marks a entity property as a children of the tree.
 * "Tree children" will contain all children (bind) of this entity.
 */
export function TreeChildren(options?: {
    cascade?: boolean | ("insert" | "update" | "remove")[];
}): Function {
    return function(object: Record<string, any>, propertyName: string) {
        if (!options) options = {} as RelationOptions;

        // now try to determine it its lazy relation
        const reflectedType =
            Reflect && (Reflect as any).getMetadata
                ? Reflect.getMetadata("design:type", object, propertyName)
                : undefined;
        const isLazy =
            (reflectedType &&
                typeof reflectedType.name === "string" &&
                reflectedType.name.toLowerCase() === "promise") ||
            false;

        // add one-to-many relation for this
        getMetadataArgsStorage().relations.push({
            isTreeChildren: true,
            target: object.constructor,
            propertyName: propertyName,
            isLazy: isLazy,
            relationType: "one-to-many",
            type: () => object.constructor,
            options: options
        } as RelationMetadataArgs);
    };
}
