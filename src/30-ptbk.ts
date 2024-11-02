import { createPipelineExecutor, assertsExecutionSuccessful } from '@promptbook/core';
import { createCollectionFromDirectory } from '@promptbook/node';
import { JavascriptExecutionTools } from '@promptbook/execute-javascript';
import { OpenAiExecutionTools } from '@promptbook/openai';

// ▶ Create whole pipeline collection
const collection = await createCollectionFromDirectory('./promptbook-collection');

// ▶ Get single Pipeline
const pipeline = await collection.getPipelineByUrl(`https://promptbook.studio/my-collection/write-article.ptbk.md`);

// ▶ Prepare tools
const tools = {
    llm: new OpenAiExecutionTools(
        //            <- TODO: [🧱] Implement in a functional (not new Class) way
        {
            isVerbose: true,
            apiKey: process.env.OPENAI_API_KEY,
        },
    ),
    script: [
        new JavascriptExecutionTools(),
        //            <- TODO: [🧱] Implement in a functional (not new Class) way
    ],
};

// ▶ Create executor - the function that will execute the Pipeline
const pipelineExecutor = createPipelineExecutor({ pipeline, tools });

// ▶ Prepare input parameters
const inputParameters = { word: 'cat' };

// 🚀▶ Execute the Pipeline
const result = await pipelineExecutor(inputParameters);

// ▶ Fail if the execution was not successful
assertsExecutionSuccessful(result);

// ▶ Handle the result
const { isSuccessful, errors, outputParameters, executionReport } = result;
console.info(outputParameters);