import { TableColumnOptions } from "../options/TableColumnOptions";
import { ColumnMetadata } from "../../metadata/ColumnMetadata";
import { Driver } from "../../driver/Driver";

export class TableUtils {
    static createTableColumnOptions(
        columnMetadata: ColumnMetadata,
        driver: Driver
    ): TableColumnOptions {
        return {
            name: columnMetadata.databaseName,
            length: columnMetadata.length,
            width: columnMetadata.width,
            charset: columnMetadata.charset,
            collation: columnMetadata.collation,
            precision: columnMetadata.precision,
            scale: columnMetadata.scale,
            zerofill: columnMetadata.zerofill,
            unsigned: columnMetadata.unsigned,
            asExpression: columnMetadata.asExpression,
            generatedType: columnMetadata.generatedType,
            default: driver.normalizeDefault(columnMetadata),
            onUpdate: columnMetadata.onUpdate,
            comment: columnMetadata.comment,
            isGenerated: columnMetadata.isGenerated,
            generationStrategy: columnMetadata.generationStrategy,
            isNullable: columnMetadata.isNullable,
            type: driver.normalizeType(columnMetadata),
            isPrimary: columnMetadata.isPrimary,
            isUnique: driver.normalizeIsUnique(columnMetadata),
            isArray: columnMetadata.isArray || false,
            enum: columnMetadata.enum
                ? columnMetadata.enum.map(val => val + "")
                : columnMetadata.enum,
            spatialFeatureType: columnMetadata.spatialFeatureType,
            srid: columnMetadata.srid
        };
    }
}
