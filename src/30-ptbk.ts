import { createPipelineExecutor, assertsExecutionSuccessful } from '@promptbook/core';
import { createCollectionFromDirectory } from '@promptbook/node';
import { JavascriptExecutionTools } from '@promptbook/execute-javascript';
import { OpenAiExecutionTools } from '@promptbook/openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log(process.env);

// ▶ Create whole pipeline collection
const collection = await createCollectionFromDirectory('./promptbook-collection');

// ▶ Get single Pipeline
const pipeline = await collection.getPipelineByUrl(`https://pavolhejny.com/hello.ptbk.md`);

// ▶ Prepare tools
const tools = {
    llm: new OpenAiExecutionTools(
        {
            isVerbose: false,
            apiKey: process.env.OPENAI_API_KEY,
        },
    ),
    script: [
        new JavascriptExecutionTools(),
    ],
};

// ▶ Create executor - the function that will execute the Pipeline
const pipelineExecutor = createPipelineExecutor({ pipeline, tools });

// ▶ Prepare input parameters
const inputParameters = { name: 'Pavol' };

// 🚀▶ Execute the Pipeline
const result = await pipelineExecutor(inputParameters);

// ▶ Fail if the execution was not successful
assertsExecutionSuccessful(result);

// ▶ Handle the result
const { isSuccessful, errors, outputParameters, executionReport } = result;
console.info(outputParameters);