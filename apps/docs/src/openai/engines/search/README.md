# SearchEngineScraper

SearchEngineScraper or SES is a class designed to scrape the web for results in different ways. It requires plugins to be loaded to function. Plugins dictate how data is scraped and how it is processed. The plugins are located in the plugins directory.

When invoking scraper, scraper will return a JSON object with sub-objects of the called plugins name. Each plugin will return an object of data. Not all plugins return the same format of data. The data returned is dependent on the plugin.

Here is an example of BardSearchs which would return the top three organic google searches, and if possible read the website and return summarized context using Bard (Bard is free and has no limit so this made sense at the time).

```
{
    "searches": {
        "BardSearchs": {
            "response": [
                {
                    "position": 1,
                    "title": "OpenAI",
                    "link": "https://openai.com/",
                    "displayedLink": "",
                    "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABQElEQVR4Ac3PIYyDMBiG4VefPDtxEj0xM39qZl40mcPhMzONOjWNrqxA4UgmqklweBQKVfFdGhbSZZvfY5qmb35++DAbO4XQF7xjpN42s1oyXtlr2gN4SRpynnTaANtesy1tkOOR8aoAJ12J6ngmGkknCqn5gv0y8Jv03eYy+PEAu07jCQ66sDqqpohBCVb2PMtvSbeoxRJcLlIFVFKVBuOwBDdNxkzjEbKbVDwHvgZw8j+Qq2fVhhjkxB2g7JwqKJMRhUqo5Lol8OTxMbSsehXw45e9ao+J92EkGaFbBscxLqnbPRhYOVXr/53L+wTVaUDmNZ+tLNyDWgdWl3gxo7otHMYY5DYdwLc6gB18tVLBSVJD6qr6fsoBVt7wyCm4PxfiRyBTx5N8kCQP8DtrzysZrebG9ZLhnaILYbIbPss/4c/row+G/FAAAAAASUVORK5CYII=",
                    "related_links": [],
                    "metadata": [],
                    "about": {
                        "about_text": "OpenAI is an American artificial intelligence research laboratory consisting of the non-profit OpenAI Incorporated and its for-profit subsidiary corporation OpenAI Limited Partnership. OpenAI conducts AI research with the declared intention of promoting and developing a friendly AI.",
                        "site_security": "secure"
                    },
                    "snippet": {
                        "date": "",
                        "description": ""
                    }
                },
                {
                    "position": 2,
                    "title": "What Is OpenAI GPT-3 Playground? How to Log in and Use Online?",
                    "link": "https://www.minitool.com/news/openai-playground.html#:~:text=OpenAI%20Playground%20is%20free%20to,will%20expire%20after%20three%20months.",
                    "displayedLink": "",
                    "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAA5klEQVR4AcWSgQaDQBzGP64n2IP0Cr3EMAADAwzQGwRCgoSAAIIxYCjGZBbDhsVGMBkEJjPbp2snFgH6OZ+O+/37391hi56RAdA0ofUwrtALYmADplzaTveNgD8o4GSa76rKHUcK/HiV5WWxALBqSJJEpu/7ICx5tSw6LMxxj6JnUexA4LouMwxD27YBMFuBVR9pms1mHMflUgqqJSWQdg+F5x3m8zKOb0EQTyZKIF1BI0pYA5+65n6GBdbmUia7p8yfcHqeTtFgGEbeoOu6dNqjVKmOVfwuTnUvhBi+adFhvLc0IHwBZ3+4uUEYxtYAAAAASUVORK5CYII=",
                    "related_links": [],
                    "metadata": [],
                    "about": {
                        "about_text": "OpenAI is an American artificial intelligence research laboratory consisting of the non-profit OpenAI Incorporated and its for-profit subsidiary corporation OpenAI Limited Partnership. OpenAI conducts AI research with the declared intention of promoting and developing a friendly AI.",
                        "site_security": "secure"
                    },
                    "snippet": {
                        "date": "",
                        "description": ""
                    }
                },
                {
                    "position": 3,
                    "title": "Elon Musk just disowned ChatGPT parent company OpenAI - Fortune",
                    "link": "https://fortune.com/2023/02/17/chatgpt-elon-musk-openai-microsoft-company-regulator-oversight/#:~:text=Elon%20Musk%20has%20disowned%20OpenAI,now%20effectively%20controlling%20the%20company.",
                    "displayedLink": "",
                    "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA90lEQVR4AWNABi8Oyh18cUjuPwTL/hfIqP0ur6HzV1le4T8S3omsB68BrF2rfjM1Lv4r5hz4W4lcAxg61/0HYe70xt8g1+A1YN98uf1A/BuGWTtXngRqhmPm+gUnJew8+3EaoCyncBDZvyoKilzY1BFtwHZZZb03sioaUKxAsgHJcoq/X8gq/wdq/v9aVuUyCQYgcBLEEHINQBjynGQDFBX/KisoLAWyF4NwrpxiK2kGeFv8Vq0LITMWNFX/qlQG/CXLACU5YPzHOf1WrQ3+T54LLHR/q9YE/SfPACXF/Sr53n+BmskzQCXCfitQ42co/go0gIOQHgAahb3idRW9zAAAAABJRU5ErkJggg==",
                    "related_links": [],
                    "metadata": [],
                    "about": {
                        "about_text": "OpenAI is an American artificial intelligence research laboratory consisting of the non-profit OpenAI Incorporated and its for-profit subsidiary corporation OpenAI Limited Partnership. OpenAI conducts AI research with the declared intention of promoting and developing a friendly AI.",
                        "site_security": "secure"
                    },
                    "snippet": {
                        "date": "",
                        "description": ""
                    },
                    "insights": {
                        "description": "The CEO says OpenAI has betrayed its founding charter by turning into a for-profit company under the control of Microsoft.",
                        "image": "https://content.fortune.com/wp-content/uploads/2023/02/GettyImages-1240222695-e1676658161240.jpg?resize=1200,600"
                    }
                }
            ]
        }
    }
}
```
