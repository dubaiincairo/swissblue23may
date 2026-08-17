---
name: openai-vector-store
description: >-
  Procedures for managing the SwissBlue AI Concierge vector store, document uploads, file indexing,
  and OpenAI model embeddings for customer service automation.
---

# OpenAI Vector Store & AI Concierge Skill

This skill guides the management of OpenAI Vector Stores and knowledge files for the SwissBlue AI Assistant.

## Key Environment Variables

- `OPENAI_API_KEY`: API key for model completion & vector store management.
- `OPENAI_VECTOR_STORE_ID`: The ID of the vector store containing approved PDFs, documents, and hotel policies.
- `OPENAI_CHAT_MODEL`: Fast model for standard inquiries (`gpt-5-mini`).
- `OPENAI_CHAT_ADVANCED_MODEL`: Escalated model for complex inquiries and human handoffs (`gpt-5.1`).

## Best Practices

1. **Document Ingestion**:
   - Only upload finalized, approved PDFs or markdown documentation for SwissBlue properties (amenities, check-in/out policies, room rates).
2. **Rate Limiting & Safety**:
   - Upstash limiter ensures strict IP and global caps (`OPENAI_CHAT_IP_PER_MINUTE`, `OPENAI_CHAT_DAILY_LIMIT`).
