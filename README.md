# Clippy

Clippy is a web-based tool and API for indexing docs and using GPT to provide helpful suggestions. Clippy is based on [tRPC](https://trpc.io) and [Next.js](https://nextjs.org). Clippy uses OpenAI's [GPT-3](https://openai.com/blog/gpt-3-apps/) to provide suggestions and OpenAI's embedding API to provide context for suggestions. This project is a work in progress and is based on Supabases implementation.

## Getting Started

To get started with Clippy, you will need to have an OpenAI API key. You can obtain an API key by signing up for OpenAI's GPT-3/4 beta program. Once you have your API key, you can add it to your environment variables by creating a .env.local file in the root directory of the project and adding the following line:
```
OPENAI_API_KEY=<your api key>
```

Next, run the following command to install the dependencies:
```
pnpm install
```
    
Then, start the development server with the following command:
```
pnpm dev
```
The Clippy web interface should now be accessible at http://localhost:3000.


## API
Clippy provides an API for indexing docs and retrieving suggestions based on a user's query. The API is built on tRPC, which provides type-safe APIs for Node.js and the browser.

`POST /api/embeds/create`
This endpoint accepts a list of URLS, processes them using Crawlee Cheerio and OpenAI's embedding API, and stores them in the database currently using Supabase.

`POST /api/clippy`
This endpoint accepts a query and returns a response from OpenAI's GPT-3 API based on data in the database.

Acknowledgements
Clippy is built on top of several open source libraries, including:

- tRPC
- Next.js
- Supabase
- OpenAI GPT-3

## License
Clippy is licensed under the [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/). See the LICENSE file for more information.