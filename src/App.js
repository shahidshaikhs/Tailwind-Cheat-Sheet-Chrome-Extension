import './assets/App.css';
import Masonry from "react-responsive-masonry";

// Data
import cheatsheet from './data/cheatsheet.json'

import {useEffect, useState} from "react";

function App() {

    const [cheatSheetData, setCheatSheetData] = useState(cheatsheet);

    useEffect(() => {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.add('dark:bg-zinc-900');
        document.querySelector('body').classList.add('dark:bg-zinc-900');
    }, []);

    const expandView = (e) => {
        e.parentNode.querySelector('.content').classList.toggle('hidden')
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            document.querySelector('.copy-container').classList.remove('copy-container-translate')
            let activeTime = 2000;
            setTimeout(() => {
                document.querySelector('.copy-container').classList.add('copy-container-translate');
            }, activeTime)
        })
    }

    const searchClass = (text) => {
        const flattenValues = (o, values = []) =>
            !Object.values(o).forEach((x) =>
                Array.isArray(x) || typeof x == "object"
                    ? [...flattenValues(x, values)]
                    : values.push(x)
            ) && values;
        const textSearch = (v, d) =>
            d.filter((x) => flattenValues(x).filter((y) => y.indexOf(v) >= 0).length);

        setCheatSheetData(() => {
            return textSearch(text, cheatsheet)
        })
    }

    return (
        <div className="App relative">
            <div className="header py-4 border-b-zinc-800 border-b-2 flex px-5 items-center">
                <h1 className="text-sky-500 text-center text-lg font-semibold flex items-center justify-center">
                    <svg className="h-6 w-6 mr-2 -mt-1" fill="currentcolor" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z"/>
                    </svg>
                    Tailwind Cheat Sheet
                </h1>
                <div className="flex ml-auto items-center border-zinc-700 border-2 rounded-full py-1 px-3">
                    <input onChange={(e) => searchClass(e.target.value)} type="text" className="bg-transparent outline-none text-white placeholder:text-zinc-600 text-sm" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-zinc-600" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
            </div>
            <main className="p-6">
                <Masonry gutter={10} columnsCount={2}>
                    {
                        cheatSheetData.map((item, index) => (
                            <div key={index} className="card">
                                <div className="rounded-t-2xl px-4 py-3 border-b-zinc-800 border-b-2">
                                    <h2 className="text-white font-bold">{item.title}</h2>
                                </div>
                                <ul className="py-3">
                                    {
                                        item.content.map((content, index) => (
                                            <li className="mb-2" key={index} onClick={(e) => expandView(e.target)}>
                                                <div className="font-medium text-zinc-300 text-sm cursor-pointer hover:bg-zinc-800 py-2 px-4 transition duration-200 flex justify-between items-center">
                                                    {content.title}
                                                    <a href={content.docs} target="_blank"
                                                       className="text-xs hover:text-sky-500 transition duration-200 tracking-wide text-zinc-500">DOCS</a>
                                                </div>
                                                <div className="hidden content">
                                                    <div className="px-4 bg-zinc-800 ">
                                                        <p className="text-xs text-zinc-300 pt-3 pb-2 font-medium border-b-2 border-zinc-700">{content.description}</p>
                                                    </div>
                                                    <ul className="bg-zinc-800 py-0 px-4 mb-3">
                                                        {
                                                            content.table.map((classes, index) => (
                                                                <li key={index} className="flex justify-between items-center last:border-0 border-b-2 border-zinc-700 py-3">
                                                                    <span onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        copyToClipboard(classes[0])
                                                                    }} className="text-[13px] text-pink-500 hover:text-pink-600 cursor-pointer transition duration-200">{classes[0]}</span>
                                                                    <span onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        copyToClipboard(classes[1])
                                                                    }} className="text-[13px] text-sky-500 hover:text-sky-600 cursor-pointer transition duration-200">{classes[1]}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </Masonry>
            </main>

            <div className="copy-container copy-container-translate fixed right-4 bottom-4 transition duration-300 shadow-lg">
                <div className="copy text-white bg-zinc-800 text-sm px-3 py-2 rounded-lg">
                    Copied!
                </div>
            </div>
        </div>
    );
}

export default App;
