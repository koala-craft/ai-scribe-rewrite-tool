---
description: Enforce standards for AI integration using Gemini 1.5 Flash, including prompt management, structured output, and error handling.
globs:
  - "backend/services/ai_service.py"
  - "backend/models/prompts.py"
alwaysApply: false
---

# AI Integration Rules (Gemini API)

## 1. Prompt Management
- **Centralized Prompts**: Maintain all prompts in a dedicated file (e.g., `backend/models/prompts.py`) to avoid scattering text logic.
- **Versioning**: Document prompt versions if behavior changes significantly.
- **Context Loading**: Ensure relevant context (e.g., user preferences, writing style) is injected into the prompt.

## 2. Gemini 1.5 Flash Usage
- **Model**: Default to `gemini-1.5-flash` for its balance of speed and cost.
- **Temperature**: Maintain `0.3` for consistent, professional output unless specified otherwise.
- **Token Limits**: Monitor and enforce `max_output_tokens` to manage costs.

## 3. Output Handling
- **Structured Output**: Request JSON output where possible to simplify parsing.
- **Validation**: Always validate the AI response before returning it to the frontend.
- **Fallback**: Have a fallback mechanism (e.g., generic error message) if the AI fails to generate a response.

## 4. Ethics & Safety
- **Content Filtering**: Rely on Gemini's built-in safety filters and monitor for inappropriate outputs.
- **Transparency**: Clear UI indication when content is AI-generated.
