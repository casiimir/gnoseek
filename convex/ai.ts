/**
 * This module contains various AI-powered actions for generating content.
 * It uses the OpenAI API through the LangChain library to create different types of content
 * such as summaries, study sheets, flowcharts, keywords, flashcards, book recommendations,
 * context explanations, topics, sections, random facts, and trend sections.
 */

import { action } from "./_generated/server";
import { v } from "convex/values";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

/**
 * Creates an OpenAI model instance with optional schema for structured output.
 * @template T - The type of the schema
 * @param {T} [schema] - Optional schema for structured output
 * @returns {ChatOpenAI} - The configured OpenAI model instance
 */
const openAiModelGenerator = <T>(schema?: T) => {
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    modelKwargs: schema && {
      response_format: schema,
    },
  });

  return model;
};

/**
 * Fetches a summary for the given text in the specified language.
 * @param {Object} args - The arguments for the action
 * @param {string} args.text - The text to summarize
 * @param {string} args.lang - The language for the summary
 * @returns {Promise<string>} - The generated summary
 */
export const fetchSummary = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    // Define the response schema for the summary
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "summary_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the summary reflecting the user's query",
            },
            subtitle: {
              type: "string",
              description: "Subtitle describing the content of the summary",
            },
            paragraphs: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "The summary content split into paragraphs, as HTML code, with a slightly engaging tone. Highlight the most important words with <mark> tags.",
            },
          },
          required: ["title", "subtitle", "paragraphs"],
          additionalProperties: false,
        },
      },
    };
    const model = openAiModelGenerator(responseSchema);

    // Define the system template for the AI
    const systemTemplate =
      "Provide a clear and precise summary with a title (minimal) and a subtitle. The summary should be engaging yet professional, avoiding excessive repetition of the argument term. Use references and abstractions to explain the concept more clearly.";

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. Language: {lang}."],
    ]);

    // Create and execute the chain
    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches a study sheet for the given text in the specified language.
 * @param {Object} args - The arguments for the action
 * @param {string} args.text - The text to create a study sheet for
 * @param {string} args.lang - The language for the study sheet
 * @returns {Promise<string>} - The generated study sheet
 */
export const fetchStudySheet = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    // Define the response schema for the study sheet
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "study_sheet_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the study sheet",
            },
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Title of the section",
                  },
                  content: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: {
                          type: "string",
                          description: "Subsection title",
                        },
                        description: {
                          type: "string",
                          description: "Detailed description of the concept",
                        },
                        example: {
                          type: "string",
                          description:
                            "If the argument is related to coding provide exclusively code examples. Otherwise, provide only a textual example.",
                        },
                        programmingLanguage: {
                          type: "string",
                          description:
                            "If the example is a programming language code example, set the programming language name lowercase. Otherwise, set to empty string.",
                        },
                      },
                      required: [
                        "title",
                        "description",
                        "example",
                        "programmingLanguage",
                      ],
                      additionalProperties: false,
                    },
                    description: "List of content items in the section",
                  },
                },
                required: ["title", "content"],
                additionalProperties: false,
              },
              description: "List of sections in the study sheet",
            },
          },
          required: ["title", "sections"],
          additionalProperties: false,
        },
      },
    };

    const model = openAiModelGenerator(responseSchema);

    // Define the system template for the AI
    const systemTemplate =
      "No text: provide only a valid JSON with a lot of study sheet content. For programming-related topics, prioritize code examples.";

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. Language output: {lang}."],
    ]);

    // Create and execute the chain
    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches a flowchart for the given text in the specified language.
 * @param {Object} args - The arguments for the action
 * @param {string} args.text - The text to create a flowchart for
 * @param {string} args.lang - The language for the flowchart
 * @returns {Promise<string>} - The generated flowchart
 */
export const fetchFlowchart = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    // Define the response schema for the flowchart
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "flowchart_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the flowchart",
            },
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  step: {
                    type: "string",
                    description: "Step number and title",
                  },
                  description: {
                    type: "string",
                    description: "Description of the step",
                  },
                  example: {
                    type: "string",
                    description: "Code example for the step",
                  },
                },
                required: ["step", "description", "example"],
                additionalProperties: false,
              },
              description: "List of steps in the flowchart",
            },
          },
          required: ["title", "steps"],
          additionalProperties: false,
        },
      },
    };

    const model = openAiModelGenerator(responseSchema);

    // Define the system template for the AI
    const systemTemplate =
      "No text: provide only JSON. You're a teacher explaining the argument to a student by steps, from basics.";

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. Language: {lang}."],
    ]);

    // Create and execute the chain
    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches keywords for the given text in the specified language.
 * @param {Object} args - The arguments for the action
 * @param {string} args.text - The text to extract keywords from
 * @param {string} args.lang - The language for the keywords
 * @returns {Promise<string>} - The generated keywords
 */
export const fetchKeywords = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    // Define the response schema for the keywords
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "keywords_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            keywords: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "The title of the keyword.",
                  },
                  description: {
                    type: "string",
                    description: "A brief description of the keyword.",
                  },
                },
                required: ["title", "description"],
                additionalProperties: false,
              },
              description: "An array of keyword objects related to the topic.",
            },
          },
          required: ["keywords"],
          additionalProperties: false,
        },
      },
    };

    const model = openAiModelGenerator(responseSchema);

    // Define the system template for the AI
    const systemTemplate =
      "No text: provide only JSON of keywords, ordered by importance, should be comprehensive and structured from basic to advanced concepts.";

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. Language: {lang}."],
    ]);

    // Create and execute the chain
    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches flashcards for the given text in the specified language.
 * @param {Object} args - The arguments for the action
 * @param {string} args.text - The text to create flashcards for
 * @param {string} args.lang - The language for the flashcards
 * @returns {Promise<string>} - The generated flashcards
 */
export const fetchFlashcards = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    // Define the response schema for the flashcards
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "flashcards_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            flashcards: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                    description: "The question asked.",
                  },
                  frontHTML: {
                    type: "string",
                    description: "The question asked.",
                  },
                  backHTML: {
                    type: "string",
                    description: "The answer to the question.",
                  },
                },
                required: ["id", "frontHTML", "backHTML"],
                additionalProperties: false,
              },
              description: "A list of flashcards with questions and answers.",
            },
          },
          required: ["flashcards"],
          additionalProperties: false,
        },
      },
    };

    const model = openAiModelGenerator(responseSchema);

    // Define the system template for the AI
    const systemTemplate = "No text: provide only JSON.";

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. 10 flashcards. Language: {lang}."],
    ]);

    // Create and execute the chain
    const chain = promptTemplate.pipe(model);
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches topics based on the provided text.
 */
export const fetchTopics = action({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    /**
     * Defines the response schema for topics.
     */
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "topics_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            topics: {
              type: "array",
              items: {
                type: "string",
                description: "Topic name.",
              },
              additionalProperties: false,
            },
          },
          required: ["topics"],
          additionalProperties: false,
        },
      },
    };

    /**
     * Creates an OpenAI model instance with the topics response schema.
     */
    const model = openAiModelGenerator(responseSchema);

    /**
     * Defines the system template for generating topics.
     */
    const systemTemplate =
      "No text: provide only JSON. Create a medium-long list of macro-topics, 1-2 words.";

    /**
     * Creates a chat prompt template with the system message.
     */
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
    ]);

    /**
     * Chains the prompt template with the model.
     */
    const chain = promptTemplate.pipe(model);

    /**
     * Invokes the chain.
     */
    const result = await chain.invoke({});

    /**
     * Extracts the content from the result as a string.
     */
    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches sections based on the provided text and language.
 */
export const fetchSections = action({
  args: {
    text: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    /**
     * Defines the response schema for sections.
     */
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "sections_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Section title.",
                  },
                  sectionName: {
                    type: "string",
                    description: "Section general name.",
                  },
                },
                required: ["title", "sectionName"],
                additionalProperties: false,
              },
              additionalProperties: false,
            },
          },
          required: ["sections"],
          additionalProperties: false,
        },
      },
    };

    /**
     * Creates an OpenAI model instance with the sections response schema.
     */
    const model = openAiModelGenerator(responseSchema);

    /**
     * Defines the system template for generating sections.
     */
    const systemTemplate =
      "No text: provide only JSON. Create a dozen of sections about {argument}, half covering general subjects, half innotaive and trends.";

    /**
     * Creates a chat prompt template with system and user messages.
     */
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {argument}. Language output: {lang}."],
    ]);

    /**
     * Chains the prompt template with the model.
     */
    const chain = promptTemplate.pipe(model);

    /**
     * Invokes the chain with the provided argument and language.
     */
    const result = await chain.invoke({
      argument: args.text,
      lang: args.lang,
    });

    /**
     * Extracts the content from the result as a string.
     */
    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches a random fact in the specified language.
 */
export const fetchRandomFact = action({
  args: {
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    /**
     * Creates an OpenAI model instance.
     */
    const model = openAiModelGenerator();

    /**
     * Defines the system template for generating a random quote.
     */
    const systemTemplate = "Generate a very short random quote.";

    /**
     * Creates a chat prompt template with system and user messages.
     */
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Language outuput: {lang}."],
    ]);

    /**
     * Chains the prompt template with the model.
     */
    const chain = promptTemplate.pipe(model);

    /**
     * Invokes the chain with the provided language.
     */
    const result = await chain.invoke({
      lang: args.lang,
    });

    /**
     * Extracts the content from the result as a string.
     */
    const resultText = result.content as string;
    return resultText;
  },
});

/**
 * Fetches trend sections based on the provided list and language.
 */
export const fetchTrendSections = action({
  args: {
    list: v.array(v.object({ title: v.string(), time: v.string() })),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    /**
     * Defines the response schema for trend sections.
     */
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "trends_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Section title.",
                  },
                  sectionName: {
                    type: "string",
                    description: "Section general name.",
                  },
                },
                required: ["title", "sectionName"],
                additionalProperties: false,
              },
              additionalProperties: false,
            },
          },
          required: ["sections"],
          additionalProperties: false,
        },
      },
    };

    /**
     * Creates an OpenAI model instance with the trend sections response schema.
     */
    const model = openAiModelGenerator(responseSchema);

    /**
     * Defines the system template for generating trend sections.
     */
    const systemTemplate =
      "No text: provide only JSON. Create {num} innovative sections about these {arguments}.";

    /**
     * Creates a chat prompt template with system and user messages.
     */
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {arguments}. Language output: {lang}."],
    ]);

    /**
     * Chains the prompt template with the model.
     */
    const chain = promptTemplate.pipe(model);

    /**
     * Invokes the chain with the provided arguments, number of items, and language.
     */
    const result = await chain.invoke({
      arguments: args.list.map((item) => item.title).join(" - "),
      num: args.list.length,
      lang: args.lang,
    });

    /**
     * Extracts the content from the result as a string.
     */
    const resultText = result.content as string;

    return resultText;
  },
});

/**
 * Fetches suggested sections based on the provided base topic, number of sections, and language.
 */
export const fetchSuggestedSections = action({
  args: {
    baseTopic: v.string(),
    num: v.number(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    /**
     * Defines the response schema for suggested sections.
     */
    const responseSchema = {
      type: "json_schema",
      json_schema: {
        name: "trends_schema",
        strict: true,
        schema: {
          type: "object",
          properties: {
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Section title.",
                  },
                  sectionName: {
                    type: "string",
                    description: "Section general name.",
                  },
                },
                required: ["title", "sectionName"],
                additionalProperties: false,
              },
              additionalProperties: false,
            },
          },
          required: ["sections"],
          additionalProperties: false,
        },
      },
    };

    /**
     * Creates an OpenAI model instance with the suggested sections response schema.
     */
    const model = openAiModelGenerator(responseSchema);

    /**
     * Defines the system template for generating suggested sections.
     */
    const systemTemplate =
      "No text: provide only JSON. Create {num} innovative sections about these {arguments}.";

    /**
     * Creates a chat prompt template with system and user messages.
     */
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "Argument: {arguments}. Language output: {lang}."],
    ]);

    /**
     * Chains the prompt template with the model.
     */
    const chain = promptTemplate.pipe(model);

    /**
     * Invokes the chain with the provided base topic, number of sections, and language.
     */
    const result = await chain.invoke({
      arguments: args.baseTopic,
      num: args.num,
      lang: args.lang,
    });

    /**
     * Extracts the content from the result as a string.
     */
    const resultText = result.content as string;

    return resultText;
  },
});
