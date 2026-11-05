/**
 * USAGE EXAMPLES for Maybe to Required Type Conversion
 *
 * This file demonstrates how to use the utility functions to convert
 * Maybe<Scalars['String']['output']> and similar types to required values.
 */

import type { Maybe, Scalars } from "./Patstore";
import {
  requireString,
  requireNumber,
  requireBoolean,
  requireId,
  requireValue,
  withDefault,
  makeFieldsRequired,
  withDefaults,
  type UnwrapScalar,
  type RequireFields,
  type DeepRequire,
} from "./utils";

// =============================================================================
// Example 1: Type-level conversion
// =============================================================================

// Define a type with Maybe fields (typical GraphQL response)
type UserResponse = {
  id: Maybe<Scalars["ID"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  age: Maybe<Scalars["Int"]["output"]>;
  isActive: Maybe<Scalars["Boolean"]["output"]>;
};

// Convert all Maybe fields to required using DeepRequire
type User = DeepRequire<UserResponse>;
// Result: { id: string; name: string; email: string; age: number; isActive: boolean; }

// Or convert only specific fields using RequireFields
type PartialUser = RequireFields<UserResponse, "id" | "name">;
// Result: { id: string; name: string; email: Maybe<string>; age: Maybe<number>; isActive: Maybe<boolean>; }

// =============================================================================
// Example 2: Runtime conversion with type-specific functions
// =============================================================================

function processUser(userResponse: UserResponse) {
  // Convert Maybe<Scalars['String']['output']> to string
  const name = requireString(userResponse.name, "name"); // throws if null/undefined
  const email = requireString(userResponse.email, "email");

  // Convert Maybe<Scalars['Int']['output']> to number
  const age = requireNumber(userResponse.age, "age");

  // Convert Maybe<Scalars['Boolean']['output']> to boolean
  const isActive = requireBoolean(userResponse.isActive, "isActive");

  // Convert Maybe<Scalars['ID']['output']> to string
  const id = requireId(userResponse.id, "id");

  return { id, name, email, age, isActive };
}

// =============================================================================
// Example 3: Generic runtime conversion
// =============================================================================

function processGeneric(userResponse: UserResponse) {
  // Use generic requireValue for any type
  const name = requireValue(userResponse.name, "name");
  const age = requireValue(userResponse.age, "age");

  return { name, age };
}

// =============================================================================
// Example 4: Using default values instead of throwing errors
// =============================================================================

function processWithDefaults(userResponse: UserResponse) {
  // Provide default values for nullable fields
  const name = withDefault(userResponse.name, "Anonymous");
  const age = withDefault(userResponse.age, 0);
  const isActive = withDefault(userResponse.isActive, false);

  return { name, age, isActive };
}

// =============================================================================
// Example 5: Transform entire objects
// =============================================================================

function transformUserObject(userResponse: UserResponse) {
  // Make specific fields required (throws if they're null/undefined)
  const user = makeFieldsRequired(userResponse, ["id", "name", "email"]);
  // user has type: RequireFields<UserResponse, 'id' | 'name' | 'email'>
  // id, name, email are guaranteed to be non-null

  return user;
}

function transformWithDefaults(userResponse: UserResponse) {
  // Provide defaults for the entire object
  const user = withDefaults(userResponse, {
    name: "Anonymous",
    age: 0,
    isActive: false,
    email: "no-email@example.com",
  });

  return user;
}

// =============================================================================
// Example 6: Working with complex nested types
// =============================================================================

type ArticleResponse = {
  id: Maybe<Scalars["ID"]["output"]>;
  title: Maybe<Scalars["String"]["output"]>;
  content: Maybe<Scalars["String"]["output"]>;
  author: Maybe<{
    name: Maybe<Scalars["String"]["output"]>;
    email: Maybe<Scalars["String"]["output"]>;
  }>;
  publishedAt: Maybe<Scalars["Date"]["output"]>;
};

function processArticle(article: ArticleResponse) {
  const id = requireId(article.id, "article.id");
  const title = requireString(article.title, "article.title");
  const content = requireString(article.content, "article.content");

  // Handle nested Maybe values
  const author = requireValue(article.author, "article.author");
  const authorName = requireString(author.name, "article.author.name");
  const authorEmail = requireString(author.email, "article.author.email");

  const publishedAt = requireValue(article.publishedAt, "article.publishedAt");

  return {
    id,
    title,
    content,
    author: {
      name: authorName,
      email: authorEmail,
    },
    publishedAt,
  };
}

// =============================================================================
// Example 7: Type-level unwrapping of individual fields
// =============================================================================

// Unwrap individual Maybe<Scalar> types
type MaybeString = Maybe<Scalars["String"]["output"]>;
type RequiredString = UnwrapScalar<MaybeString>; // string

type MaybeNumber = Maybe<Scalars["Int"]["output"]>;
type RequiredNumber = UnwrapScalar<MaybeNumber>; // number

type MaybeBoolean = Maybe<Scalars["Boolean"]["output"]>;
type RequiredBoolean = UnwrapScalar<MaybeBoolean>; // boolean

// =============================================================================
// Example 8: Try-catch pattern for error handling
// =============================================================================

function safeProcessUser(userResponse: UserResponse) {
  try {
    const name = requireString(userResponse.name, "name");
    const email = requireString(userResponse.email, "email");

    return { success: true, data: { name, email } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export {
  processUser,
  processGeneric,
  processWithDefaults,
  transformUserObject,
  transformWithDefaults,
  processArticle,
  safeProcessUser,
};
