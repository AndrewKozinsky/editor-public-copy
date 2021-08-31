import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from 'store/rootReducer'


// Hook sets scripts and styles to <head> and <body> of the IFrame
export function useSetUserScriptsAndStylesToIFrame() {
    const { $links, incFiles, history } = useSelector((store: AppStateType) => store.article)

    // Were mouse move handler set?
    const [filesWereSet, setFilesWereSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || !history.length || filesWereSet) return

        // Set code in <head>
        if (incFiles.inHead) {
            const nodes = createNodesFromString(incFiles.inHead)
            putNodesToDocument($links.$document, nodes, 'head')
        }

        // Set code before end the <body>
        if (incFiles.beforeEndBody) {
            const nodes = createNodesFromString(incFiles.beforeEndBody)
            putNodesToDocument($links.$document, nodes, 'body')
        }

        // Set flag that files were set
        setFilesWereSet(true)

    }, [$links, incFiles, incFiles, history, filesWereSet])

    useEffect(function () {
        if (!history.length) {
            // Set flag that files are not set
            setFilesWereSet(false)
        }
    }, [history])
}

/**
 * The function gets string with HTML and turns it into html-elements
 * @param {String} htmlStr — string with html
 */
function createNodesFromString(htmlStr: string): Element[] {
    const div = document.createElement('div')
    div.innerHTML = htmlStr

    let nodes: Element[] = []

    for (let node of div.children) {
        const createdNode = createNode(node)
        nodes.push(createdNode)
    }

    return nodes
}

/**
 * The function gets <script> or <style> element and recreates it in the new element because I can't set node
 * into <head> or <body> without this procedure. It doesn't work. So I must recreate nodes.
 * @param {Element} node — node
 */
function createNode(node: Element) {
    const newNode = document.createElement(node.tagName.toLowerCase())

    for (let attr of node.attributes) {
        //@ts-ignore
        newNode[attr.name] = attr.value || true
    }

    return newNode
}

/**
 * The function set <script> or <style> elements into <head> or <body>
 * @param {Document} $doc — document
 * @param {NodeListOf} nodes — nodes list
 * @param {String} place — where to put nodes
 */
function putNodesToDocument($doc: Document, nodes: Node[], place: 'head' | 'body') {
    const $place = place === 'head' ? $doc.head : $doc.body

    for (let node of nodes) {
        $place.appendChild(node)
    }
}
