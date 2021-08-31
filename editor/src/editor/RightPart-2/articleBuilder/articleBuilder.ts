import {ReactElement} from 'react'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'
import TempCompTypes from 'src/store/article/codeType/tempCompCodeType'
import createJsxFromComponents from './componentsToJSX';
import createHTMLFromComponents from './createHTMLFromComponents';
import { HTMLObjArrType } from './parceComponent/htmlStringToObject';
import { parseComponent } from './parceComponent/parseComponent'


function createComponentsArr(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]) {
    // Переберу массив компонентов
    let componentsArr: HTMLObjArrType.Arr = articleData.components.map(
        compObj => parseComponent(<ArticleTypes.Component>compObj, tempComps)
    )

    return componentsArr
}

export function turnArticleDataToJSX(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): ReactElement {
    const componentsArr = createComponentsArr(articleData, tempComps)

    // Create JSX from components array
    return createJsxFromComponents(componentsArr)
}

export function turnArticleDataToHTML(articleData: ArticleTypes.Article, tempComps: TempCompTypes.TempComp[]): string {
    const componentsArr = createComponentsArr(articleData, tempComps)

    // Create HTML from components array
    return createHTMLFromComponents(componentsArr)
}


