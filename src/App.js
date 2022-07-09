import "./assets/App.css";
import Masonry from "react-responsive-masonry";

// Data
import cheatsheet from "./data/cheatsheet.json";

import {useEffect, useState} from "react";

function App() {
    const [cheatSheetData, setCheatSheetData] = useState(cheatsheet);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        document.querySelector("html").classList.add("dark");
        document.querySelector("body").classList.add("dark:bg-zinc-900")
        document.querySelector("body").classList.add("bg-white");
    }, []);

    const expandView = (e) => {
        e.parentNode.querySelector(".content").classList.toggle("hidden");
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            document
                .querySelector(".copy-container")
                .classList.remove("copy-container-translate");
            let activeTime = 2000;
            setTimeout(() => {
                document
                    .querySelector(".copy-container")
                    .classList.add("copy-container-translate");
            }, activeTime);
        });
    };

    /*
        Filters Data based on query compared with multiple Fields i.e
        title, content.title, content.description, content.table
    */
    useEffect(() => {
        (async () => {
            const textSearch = (searchTerm, data) => {
                if (searchTerm.length < 2) {
                    return cheatsheet;
                }
                for (let i = data.length - 1; i >= 0; i--) {
                    let item = data[i];
                    if (!item.title.toLowerCase().includes(searchTerm)) {
                        if (JSON.stringify(item.content).toLowerCase().includes(searchTerm)) {
                            for (let j = item.content.length - 1; j >= 0; j--) {
                                let content = item.content[j];
                                // console.log(searchTerm);
                                if (
                                    !content.title.toLowerCase().includes(searchTerm) &&
                                    !content.description.toLowerCase().includes(searchTerm)
                                ) {
                                    let filteredTable = content.table.filter((x) => {
                                        return x.join("").toLowerCase().includes(searchTerm);
                                    });
                                    if (filteredTable.length === 0) {
                                        item.content.splice(j, 1);
                                    } else {
                                        item.content[j].table = filteredTable;
                                    }
                                }
                            }
                            if (item.content.length === 0) {
                                data.splice(i, 1);
                            } else {
                                data[i] = item;
                            }
                        } else {
                            data.splice(i, 1);
                        }
                    }
                }
                return data;
            };

            setCheatSheetData(
                await textSearch(
                    searchTerm.trim().toLowerCase(),
                    JSON.parse(JSON.stringify(cheatsheet))
                )
            );
        })();
    }, [searchTerm]);

    const searchClass = (query) => {
        setSearchTerm(query);
    };

    return (
        <div className="relative App">
            <div className="flex items-center px-5 py-4 border-b-2 header dark:border-b-zinc-800 border-b-zinc-200">
                <h1 className="flex items-center justify-center text-lg font-semibold text-center text-sky-500">
                    <svg
                        className="w-6 h-6 mr-2 -mt-1"
                        fill="currentcolor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z"/>
                    </svg>
                    Tailwind Cheat Sheet
                </h1>
                <a
                    rel="noreferrer"
                    href="https://github.com/shahidshaikhs/Tailwind-Cheat-Sheet-Chrome-Extension"
                    target="_blank"
                    className="inline-block ml-auto transition duration-200 text-zinc-600 hover:text-sky-500"
                >
                    <svg
                        fill="currentColor"
                        className="w-6 h-6 ml-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"/>
                    </svg>
                </a>
                <div
                    className="flex items-center px-3 py-1 ml-3 border-2 rounded-full border-zinc-700 focus-within:border-sky-500 text-zinc-600 focus-within:text-sky-500">
                    <input
                        autoFocus
                        onChange={(e) => searchClass(e.currentTarget.value)}
                        type="text"
                        className="text-sm text-white bg-transparent outline-none placeholder:text-zinc-600"
                        placeholder="Search"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
            <main className="p-6">
                <Masonry gutter="10px" columnsCount={2}>
                    {cheatSheetData.length > 0 && cheatSheetData.map((item, index) => (
                        <div key={index} className="card">
                            <div className="px-4 py-3 border-b-2 rounded-t-2xl dark:border-b-zinc-800 border-b-zinc-200">
                                <h2 className="font-bold dark:text-white text-zinc-600">{item.title}</h2>
                            </div>
                            <ul className="py-3">
                                {item.content.map((content, index) => (
                                    <li
                                        className="mb-2"
                                        key={index}
                                        onClick={(e) => expandView(e.target)}
                                    >
                                        <div
                                            className="flex items-center justify-between px-4 py-2 text-sm font-medium transition duration-200 cursor-pointer dark:text-zinc-300 dark:hover:bg-zinc-800 dark:text-zinc-500 hover:bg-zinc-200">
                                            {content.title}
                                            <a
                                                rel="noreferrer"
                                                href={content.docs}
                                                target="_blank"
                                                className="text-xs tracking-wide transition duration-200 hover:text-sky-500 text-zinc-500"
                                            >
                                                DOCS
                                            </a>
                                        </div>
                                        <div className="hidden content">
                                            <div className="px-4 dark:bg-zinc-800 bg-zinc-100">
                                                <p className="pt-3 pb-2 text-xs font-medium border-b-2 dark:text-zinc-300 text-zinc-600 dark:border-b-zinc-700 border-b-zinc-200">
                                                    {content.description}
                                                </p>
                                            </div>
                                            <ul className="px-4 py-0 mb-3 dark:bg-zinc-800 bg-zinc-100">
                                                {content.table.map((classes, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center justify-between py-3 border-b-2 last:border-0 dark:border-b-zinc-700 border-b-zinc-200"
                                                    >
														<span
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                copyToClipboard(classes[0]);
                                                            }}
                                                            className="flex-none text-[13px] text-pink-500 hover:text-pink-600 cursor-pointer transition duration-200 mr-5"
                                                        >
															{classes[0]}
														</span>
                                                        <span className="text-right">
															<span
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    copyToClipboard(classes[1]);
                                                                }}
                                                                className="text-[13px] text-sky-500 hover:text-sky-600 cursor-pointer transition duration-200"
                                                            >
																{classes[1]}
															</span>
                                                            {classes[2] && (
                                                                <span
                                                                    className="text-xs transition duration-200 cursor-pointer dark:text-zinc-300 text-zinc-500 hover:text-sky-600">
																	{" "}
                                                                    ({classes[2]})
																</span>
                                                            )}
														</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Masonry>

				{cheatSheetData.length <= 0 && (
					<div className="text-center">
						<p className="text-zinc-300 mb-2">No classes found</p>
						<p className="text-zinc-500 text-sm">Please try again with different keywords</p>
					</div>
				)}
            </main>

            <div
                className="fixed transition duration-300 shadow-lg copy-container copy-container-translate right-4 bottom-4">
                <div className="px-3 py-2 text-sm text-white rounded-lg copy bg-zinc-800">
                    Copied!
                </div>
            </div>
        </div>
    );
}

export default App;
