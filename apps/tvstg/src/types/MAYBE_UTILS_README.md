# Maybe Type Utilities

Utilities to convert `Maybe<T>` types (nullable GraphQL types) into required TypeScript values.

## Overview

This utility library provides both **type-level** and **runtime** functions to transform GraphQL's `Maybe<Scalars['String']['output']>` types into native TypeScript types like `string`, `number`, `boolean`, etc.

## Type Utilities

### `UnwrapScalar<T>`

Converts `Maybe<Scalars['X']['output']>` types to their native TypeScript equivalents:

- `Maybe<Scalars['String']['output']>` → `string`
- `Maybe<Scalars['Int']['output']>` → `number`
- `Maybe<Scalars['Float']['output']>` → `number`
- `Maybe<Scalars['Boolean']['output']>` → `boolean`
- `Maybe<Scalars['ID']['output']>` → `string`

```typescript
type MaybeString = Maybe<Scalars["String"]["output"]>;
type RequiredString = UnwrapScalar<MaybeString>; // string
```

### `DeepRequire<T>`

Converts all `Maybe` fields in an object type to required fields:

```typescript
type UserResponse = {
  id: Maybe<Scalars["ID"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
};

type User = DeepRequire<UserResponse>;
// Result: { id: string; name: string; }
```

### `RequireFields<T, K>`

Converts only specific fields to required:

```typescript
type PartialUser = RequireFields<UserResponse, "id" | "name">;
// Result: { id: string; name: string; email: Maybe<string>; ... }
```

## Runtime Functions

### Type-Specific Converters

#### `requireString(value, fieldName?)`

Converts `Maybe<Scalars['String']['output']>` to `string`:

```typescript
const name = requireString(user.name, "name"); // throws if null
```

#### `requireNumber(value, fieldName?)`

Converts `Maybe<Scalars['Int']['output']>` or `Maybe<Scalars['Float']['output']>` to `number`:

```typescript
const age = requireNumber(user.age, "age");
```

#### `requireBoolean(value, fieldName?)`

Converts `Maybe<Scalars['Boolean']['output']>` to `boolean`:

```typescript
const isActive = requireBoolean(user.isActive, "isActive");
```

#### `requireId(value, fieldName?)`

Converts `Maybe<Scalars['ID']['output']>` to `string`:

```typescript
const id = requireId(user.id, "id");
```

### Generic Converters

#### `requireValue<T>(value, fieldName?)`

Generic function for any type:

```typescript
const value = requireValue(maybeValue, "fieldName"); // throws if null
```

#### `withDefault<T>(value, defaultValue)`

Provide a fallback value instead of throwing:

```typescript
const name = withDefault(user.name, "Anonymous"); // returns 'Anonymous' if null
```

### Object Transformers

#### `makeFieldsRequired<T, K>(obj, fields)`

Transform an object to make specific fields required:

```typescript
const user = makeFieldsRequired(userResponse, ["id", "name", "email"]);
// id, name, email are now guaranteed to be non-null (throws if they are)
```

#### `withDefaults(obj, defaults)`

Provide default values for nullable fields:

```typescript
const user = withDefaults(userResponse, {
  name: "Anonymous",
  age: 0,
  isActive: false,
});
```

## Usage Examples

### Basic Usage

```typescript
import { requireString, requireNumber, requireId } from "./types";

function processUser(userResponse: UserResponse) {
  const id = requireId(userResponse.id, "id");
  const name = requireString(userResponse.name, "name");
  const age = requireNumber(userResponse.age, "age");

  return { id, name, age };
}
```

### With Default Values

```typescript
import { withDefault } from "./types";

function processUser(userResponse: UserResponse) {
  const name = withDefault(userResponse.name, "Anonymous");
  const age = withDefault(userResponse.age, 0);

  return { name, age };
}
```

### Error Handling

```typescript
import { requireString } from "./types";

function safeProcessUser(userResponse: UserResponse) {
  try {
    const name = requireString(userResponse.name, "name");
    return { success: true, data: { name } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### Transform Entire Objects

```typescript
import { makeFieldsRequired, withDefaults } from "./types";

// Option 1: Require specific fields (throws if null)
const user = makeFieldsRequired(userResponse, ["id", "name"]);

// Option 2: Provide defaults for all nullable fields
const user = withDefaults(userResponse, {
  name: "Anonymous",
  email: "no-email@example.com",
  age: 0,
});
```

## Error Messages

When using `require*` functions, errors will include the field name:

```typescript
requireString(null, "user.name");
// Throws: Error: Required field "user.name" is null or undefined
```

## See Also

- `utils.example.ts` - Comprehensive usage examples
- `Patstore.d.ts` - GraphQL type definitions
