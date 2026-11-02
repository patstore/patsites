import { recordSchema } from "./fields.ts";
import { findModule } from "./modules.ts";
import type { PatStoreModule } from "./types.ts";
import { z } from "zod";

export function buildApplicationSchemas(
  modules: readonly PatStoreModule[],
): Record<string, z.ZodType> {
  const schemas: Record<string, z.ZodType> = {};
  for (const module of modules) {
    if (!module.connected_class || schemas[module.connected_class]) {
      continue;
    }
    schemas[module.connected_class] = recordSchema(module);
  }
  return schemas;
}

export function schemaForClass(
  modules: readonly PatStoreModule[],
  className: string,
): z.ZodType | null {
  const module = findModule(modules, className);
  return module ? recordSchema(module) : null;
}

export function parseRecords<T>(schema: z.ZodType<T>, records: readonly unknown[]): T[] {
  const parsed: T[] = [];
  for (const record of records) {
    const result = schema.safeParse(record);
    if (result.success) {
      parsed.push(result.data);
    }
  }
  return parsed;
}
