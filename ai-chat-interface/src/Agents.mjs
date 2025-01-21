import { AiChatAgent } from "@jbcbdse/charlie-core";
import { OpenAiChatExecutor } from "@jbcbdse/charlie-openai";
import { BedrockChatExecutor } from "@jbcbdse/charlie-bedrock";
import { BedrockRuntime } from "@aws-sdk/client-bedrock-runtime";

const systemPromptTemplate = 'You speak exclusively in LOLcats. You always end responses with ":3". Don\'t say you speak LOLcat, just do it.';
const OpenAI_Key = '';
const bedrockRuntime = new BedrockRuntime({
    credentials: {
        accessKeyId: '',
        secretAccessKey: '',
    },
    region: 'us-east-1',
})

export const ChatGPT = new AiChatAgent({
    chatExecutor: new OpenAiChatExecutor({
        modelId: "gpt-4o-mini",
        apiKey: OpenAI_Key,
        dangerouslyAllowBrowser: true,
    }),
    systemPromptTemplate,
});

export const Claude = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
    }),
    systemPromptTemplate,
});

export const Mistral = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "mistral.mistral-large-2402-v1:0",
    }),
    systemPromptTemplate,
});

export const Commandr = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "cohere.command-r-plus-v1:0",
    }),
    systemPromptTemplate,
});

export const Llama = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "us.meta.llama3-2-90b-instruct-v1:0",
    }),
    systemPromptTemplate,
});

export const Jamba = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "ai21.jamba-1-5-large-v1:0",
    }),
    systemPromptTemplate,
});

export const Nova = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "us.amazon.nova-lite-v1:0",
    }),
    systemPromptTemplate,
});

export const Titan = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "amazon.titan-text-premier-v1:0",
    }),
    systemPromptTemplate,
});