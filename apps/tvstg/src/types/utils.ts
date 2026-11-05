import type { Maybe, Scalars } from "./Patstore";

/**
 * Type utility to unwrap Maybe types and convert Scalars to native TypeScript types
 */
export type Require<T> = NonNullable<T>;

/**
 * Unwrap Maybe and convert Scalar types to their native TypeScript equivalents
 */
export type UnwrapScalar<T> =
  T extends Maybe<Scalars["String"]["output"]>
    ? string
    : T extends Maybe<Scalars["Int"]["output"]>
      ? number
      : T extends Maybe<Scalars["Float"]["output"]>
        ? number
        : T extends Maybe<Scalars["Boolean"]["output"]>
          ? boolean
          : T extends Maybe<Scalars["ID"]["output"]>
            ? string
            : T extends Maybe<Scalars["Date"]["output"]>
              ? Date | any
              : T extends Maybe<Scalars["JSON"]["output"]>
                ? any
                : T extends Maybe<infer U>
                  ? NonNullable<U>
                  : T;

/**
 * Runtime function to assert that a Maybe value is defined and return it as required
 * @throws Error if value is null or undefined
 */
export function requireValue<T>(value: Maybe<T>, fieldName?: string): T {
  if (value === null || value === undefined) {
    throw new Error(
      `Required field ${fieldName ? `"${fieldName}" ` : ""}is null or undefined`,
    );
  }
  return value;
}

/**
 * Runtime function to convert a Maybe value to required with a default fallback
 */
export function withDefault<T>(value: Maybe<T>, defaultValue: T): T {
  return value !== null && value !== undefined ? value : defaultValue;
}

/**
 * Convert Maybe<Scalars['String']['output']> to string
 */
export function requireString(
  value: Maybe<Scalars["String"]["output"]>,
  fieldName?: string,
): string {
  return requireValue(value, fieldName);
}

/**
 * Convert Maybe<Scalars['Int']['output']> or Maybe<Scalars['Float']['output']> to number
 */
export function requireNumber(
  value: Maybe<Scalars["Int"]["output"] | Scalars["Float"]["output"]>,
  fieldName?: string,
): number {
  return requireValue(value, fieldName);
}

/**
 * Convert Maybe<Scalars['Boolean']['output']> to boolean
 */
export function requireBoolean(
  value: Maybe<Scalars["Boolean"]["output"]>,
  fieldName?: string,
): boolean {
  return requireValue(value, fieldName);
}

/**
 * Convert Maybe<Scalars['ID']['output']> to string
 */
export function requireId(
  value: Maybe<Scalars["ID"]["output"]>,
  fieldName?: string,
): string {
  return requireValue(value, fieldName);
}

/**
 * Type helper to convert all Maybe properties in an object type to required
 */
export type RequireFields<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]-?: UnwrapScalar<T[P]>;
};

/**
 * Deep convert all Maybe fields to required (one level deep)
 */
export type DeepRequire<T> = {
  [P in keyof T]-?: UnwrapScalar<T[P]>;
};

/**
 * Runtime function to transform an object with Maybe fields to required fields
 * @param obj - The object with Maybe fields
 * @param requiredFields - Array of field names that should be required
 * @returns A new object with the specified fields as required
 * @throws Error if any required field is null or undefined
 */
export function makeFieldsRequired<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, requiredFields: K[]): RequireFields<T, K> {
  const result = { ...obj };

  for (const field of requiredFields) {
    if (result[field] === null || result[field] === undefined) {
      throw new Error(`Required field "${String(field)}" is null or undefined`);
    }
  }

  return result as unknown as RequireFields<T, K>;
}

/**
 * Runtime function to safely extract values from Maybe fields with defaults
 * @param obj - The object with Maybe fields
 * @param defaults - Object with default values for fields
 * @returns A new object with Maybe fields replaced with their values or defaults
 */
export function withDefaults<T extends Record<string, any>>(
  obj: T,
  defaults: Partial<Record<keyof T, any>>,
): T {
  const result = { ...obj };

  for (const key in defaults) {
    if (result[key] === null || result[key] === undefined) {
      result[key] = defaults[key];
    }
  }

  return result;
}
