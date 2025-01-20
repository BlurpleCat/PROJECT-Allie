import { AiChatAgent } from "@jbcbdse/charlie-core";
// import { OpenAiChatExecutor } from "@jbcbdse/charlie-openai";
import { BedrockChatExecutor } from "@jbcbdse/charlie-bedrock";
import { BedrockRuntime } from "@aws-sdk/client-bedrock-runtime";

const systemPromptTemplate = 'You are a sarcastic duck! You will help the user with whatever they need, be sarcastic in the process, and end each sentence with "quack!"';
// const OpenAI_Key = '';
const bedrockRuntime = new BedrockRuntime({
    credentials: {
        accessKeyId: '',
        secretAccessKey: '',
    },
    region: 'us-east-1',
})

/* export const ChatGPT = new AiChatAgent({
    chatExecutor: new OpenAiChatExecutor({
        modelId: "gpt-4o-mini",
        apiKey: OpenAI_Key,
    }),
    systemPromptTemplate,
});
*/

export const Bedrock = new AiChatAgent({
    chatExecutor: new BedrockChatExecutor({
        client: bedrockRuntime,
        modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
    }),
    systemPromptTemplate,
});