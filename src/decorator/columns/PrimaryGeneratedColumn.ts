import { ColumnOptions, getMetadataArgsStorage } from "../../";
import { PrimaryGeneratedColumnNumericOptions } from "../options/PrimaryGeneratedColumnNumericOptions";
import { PrimaryGeneratedColumnUUIDOptions } from "../options/PrimaryGeneratedColumnUUIDOptions";
import { GeneratedMetadataArgs } from "../../metadata-args/GeneratedMetadataArgs";

/**
 * Column decorator is used to mark a specific class property as a table column.
 */
export function PrimaryGeneratedColumn(): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 */
export function PrimaryGeneratedColumn(
    options: PrimaryGeneratedColumnNumericOptions
): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 */
export function PrimaryGeneratedColumn(
    strategy: "increment",
    options?: PrimaryGeneratedColumnNumericOptions
): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 */
export function PrimaryGeneratedColumn(
    strategy: "uuid",
    options?: PrimaryGeneratedColumnUUIDOptions
): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 */
export function PrimaryGeneratedColumn(
    strategy: "rowid",
    options?: PrimaryGeneratedColumnUUIDOptions
): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 * This column creates an integer PRIMARY COLUMN with generated set to true.
 */
export function PrimaryGeneratedColumn(
    strategyOrOptions?:
        | "increment"
        | "uuid"
        | "rowid"
        | PrimaryGeneratedColumnNumericOptions
        | PrimaryGeneratedColumnUUIDOptions,
    maybeOptions?:
        | PrimaryGeneratedColumnNumericOptions
        | PrimaryGeneratedColumnUUIDOptions
): Function {
    // normalize parameters
    const options: ColumnOptions = {};
    let strategy: "increment" | "uuid" | "rowid";
    if (strategyOrOptions) {
        if (typeof strategyOrOptions === "string")
            strategy = strategyOrOptions as "increment" | "uuid" | "rowid";

        if (strategyOrOptions instanceof Object) {
            strategy = "increment";
            Object.assign(options, strategyOrOptions);
        }
    } else {
        strategy = "increment";
    }
    if (maybeOptions instanceof Object) Object.assign(options, maybeOptions);

    return function(object: Record<string, any>, propertyName: string) {
        // if column type is not explicitly set then determine it based on generation strategy
        if (!options.type) {
            if (strategy === "increment") {
                options.type = Number;
            } else if (strategy === "uuid") {
                options.type = "uuid";
            } else if (strategy === "rowid") {
                options.type = "int";
            }
        }

        // explicitly set a primary and generated to column options
        options.primary = true;

        // register column metadata args
        getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName: propertyName,
            mode: "regular",
            options: options
        });

        // register generated metadata args
        getMetadataArgsStorage().generations.push({
            target: object.constructor,
            propertyName: propertyName,
            strategy: strategy
        } as GeneratedMetadataArgs);
    };
}
