#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "uoj8zwj3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN || "";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-28",
  useCdn: false,
  token: token || undefined,
});

const server = new Server(
  {
    name: "swissblue-sanity-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "sanity_groq_query",
        description: "Execute a read-only GROQ query against the Sanity dataset",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The GROQ query string (e.g. '*[_type == \"corporateRequest\"] | order(_createdAt desc)[0..10]')",
            },
            params: {
              type: "object",
              description: "Optional query parameters",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "sanity_mutate_document",
        description: "Create or patch a document in the Sanity dataset",
        inputSchema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: ["create", "createOrReplace", "patch", "delete"],
              description: "The mutation action to perform",
            },
            document: {
              type: "object",
              description: "Document body for create / createOrReplace",
            },
            documentId: {
              type: "string",
              description: "Document ID for patch or delete",
            },
            patches: {
              type: "object",
              description: "Patch operations (e.g. { set: { ... }, unset: [...] })",
            },
          },
          required: ["action"],
        },
      },
      {
        name: "sanity_get_submissions",
        description: "Fetch latest form submissions (B2B corporate, Careers, or Chat leads)",
        inputSchema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["corporateRequest", "careerApplication", "chatLead", "all"],
              description: "Type of submission to fetch",
            },
            limit: {
              type: "number",
              description: "Maximum number of records to return (default 20)",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "sanity_groq_query") {
      const result = await client.fetch(args.query, args.params || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === "sanity_mutate_document") {
      if (!token) {
        throw new Error("SANITY_API_WRITE_TOKEN is required for write mutations.");
      }
      let res;
      if (args.action === "create") {
        res = await client.create(args.document);
      } else if (args.action === "createOrReplace") {
        res = await client.createOrReplace(args.document);
      } else if (args.action === "patch") {
        let p = client.patch(args.documentId);
        if (args.patches?.set) p = p.set(args.patches.set);
        if (args.patches?.unset) p = p.unset(args.patches.unset);
        res = await p.commit();
      } else if (args.action === "delete") {
        res = await client.delete(args.documentId);
      }
      return {
        content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
      };
    }

    if (name === "sanity_get_submissions") {
      const limit = args?.limit || 20;
      const type = args?.type || "all";
      let groq = `*[_type in ["corporateRequest", "careerApplication", "chatLead"]] | order(_createdAt desc)[0...${limit}]`;
      if (type !== "all") {
        groq = `*[_type == "${type}"] | order(_createdAt desc)[0...${limit}]`;
      }
      const submissions = await client.fetch(groq);
      return {
        content: [{ type: "text", text: JSON.stringify(submissions, null, 2) }],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    return {
      isError: true,
      content: [{ type: "text", text: `Sanity MCP Error: ${err.message}` }],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
