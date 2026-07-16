import { createClient } from "next-sanity";
import { dataset, projectId, apiVersion } from "@/sanity/env";

const DOCUMENT_ID = "chat-knowledge-base";

export type ChatKnowledgeSource = {
  id: string;
  kind: "pdf" | "url";
  title: string;
  sourceUrl?: string;
  fileId: string;
  vectorStoreFileId: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
};

type ChatKnowledgeDocument = {
  _id: string;
  _type: "chatKnowledgeBase";
  sources: ChatKnowledgeSource[];
  updatedAt: string;
};

function readToken() {
  return process.env.SANITY_READ ?? process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;
}

function sanityClient(token?: string) {
  if (!projectId || !dataset || !token) return null;
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}

export function isChatKnowledgeConfigured() {
  return Boolean(
    projectId &&
      dataset &&
      process.env.SANITY_API_WRITE_TOKEN &&
      process.env.OPENAI_API_KEY &&
      process.env.OPENAI_VECTOR_STORE_ID,
  );
}

export async function listChatKnowledgeSources() {
  const client = sanityClient(readToken());
  if (!client) return [];

  const document = await client.fetch<ChatKnowledgeDocument | null>(
    `*[_id == $id][0]{_id, _type, sources, updatedAt}`,
    { id: DOCUMENT_ID },
    { cache: "no-store" },
  );

  return Array.isArray(document?.sources) ? document.sources : [];
}

async function writeSources(sources: ChatKnowledgeSource[]) {
  const client = sanityClient(process.env.SANITY_API_WRITE_TOKEN);
  if (!client) throw new Error("Chat knowledge storage is not configured.");

  await client.createOrReplace({
    _id: DOCUMENT_ID,
    _type: "chatKnowledgeBase",
    sources,
    updatedAt: new Date().toISOString(),
  });
}

export async function addChatKnowledgeSource(source: ChatKnowledgeSource) {
  const sources = await listChatKnowledgeSources();
  await writeSources([source, ...sources.filter((item) => item.id !== source.id)]);
  return source;
}

export async function updateChatKnowledgeSourceStatus(
  id: string,
  status: ChatKnowledgeSource["status"],
) {
  const sources = await listChatKnowledgeSources();
  const next = sources.map((source) => (source.id === id ? { ...source, status } : source));
  await writeSources(next);
}

export async function removeChatKnowledgeSource(id: string) {
  const sources = await listChatKnowledgeSources();
  const source = sources.find((item) => item.id === id) ?? null;
  if (!source) return null;
  await writeSources(sources.filter((item) => item.id !== id));
  return source;
}
