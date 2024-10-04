# RuntimeUI

## Introduction

Is it possible to have AI generate a single react component and integrate that component into a loaded site without refreshing the page? 

__Yes!__
Here's one way to do it.

1. Create a React project and add a dummy component where you want the AI's component to go.
2. Compile and serve the project
3. At runtime, have the AI write the code in tsx to fill in the dummy component
4. Build the dummy component (still at runtime) into commonjs (I used esbuild here)
5. Feed the commonjs response into the dummy component
6. Have the dummy component call eval on the built code

There are some additional complexities about how the code should be generated, validated, and processed before building. 
Details of this can be found in `backend/src/runtimeBuild.ts` and `backend/src/Genration/generateComponent.ts`

## Implications

This makes it possible for AI to create interactive visualizations that connect to the rest of the react applications. 
The generated component could access context, hooks, or even routes from the loaded react environment.

## Latency

At the time of writing, Claude 3.5 Sonnet had by far the best results of the models I tested but the latency was generally poor.

Using Llama3-8b on Groq was super fast but most generation attempts failed to compile and typecheck. Here concurrency can be exchanged for latency to great effect but generations are of poor quality. 

This approach only builds the generated component so latency scales with the component size but not the project size. 

## Other

See `https://github.com/brianbob12/RuntimeUI/blob/main/backend/README.md` for instructions on running.
