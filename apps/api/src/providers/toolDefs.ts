import { zodToJsonSchema } from "zod-to-json-schema";
import {
  toolSchemas,
  toolDescriptions,
  type ToolName,
  type CanonicalToolDef,
} from "@travator/shared";

/**
 * Generate vendor-neutral tool definitions from the shared Zod input schemas.
 * Each provider adapter translates these into its own tool/function format.
 */
export function buildCanonicalToolDefs(names?: ToolName[]): CanonicalToolDef[] {
  const selected = (names ?? (Object.keys(toolSchemas) as ToolName[]));
  return selected.map((name) => {
    const json = zodToJsonSchema(toolSchemas[name].input, {
      target: "jsonSchema7",
      $refStrategy: "none",
    }) as Record<string, unknown>;
    // Strip the $schema key some consumers reject.
    delete json.$schema;
    return {
      name,
      description: toolDescriptions[name],
      parameters: json,
    };
  });
}
