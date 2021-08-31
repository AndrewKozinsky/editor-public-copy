namespace ArticleTypes {
    // Article
    export type Article = {
        // Additional information
        meta: {
            // Max component id to understand what component id must be next
            maxComponentId: number
        }
        // Components array
        components: Components
    }

    export type Components = ArticleArrayItem[]
    export type ArticleArrayItem = Component | TextComponent

    // =================================================================================================================

    // Component
    export type Component = {
        // Component type
        type: 'component'
        // Component data id
        dataCompId: DataCompId // 1
        // Component template id
        tempCompId: TempCompId // 'fhd-009-dfd-mvpo'
        layer?: Layer
        // Component elements
        elems?: ComponentElems
    }

    export type DataCompId = number // 1
    export type TempCompId = string // 'fhd-009-dfd-mvpo'

    // Layers options
    export type Layer = {
        collapsed?: boolean // true
        hidden?: boolean // true
    }

    // Component elements
    export type ComponentElems = ComponentElem[]

    // Component element
    export type ComponentElem = {
        // Element data id
        dataElemId: DataElemId // 1
        // Element template id
        tempElemId: TempElemId // 1
        // Name of elements group with the same tempElemId. They may be several groups with the same tempElemId.
        elemGroup: ElemGroup // 'banner-1'
        // Или идентификатор тега (если выбрали из списка тегов) или название тега (если написали название в текстовое поле)
        tag?: Tag
        attribs?: Attribs
        layer?: Layer
        children?: ElemChildren
    }

    export type DataElemId = number // 1
    export type TempElemId = string // 'banner'
    export type ElemGroup = string // ''banner-1'
    export type Tag = number | string // 1 OR 'div'

    export type Attribs = Attrib[]

    export type Attrib = {
        id: ComponentElemAttribId // 1
        // Array of attributes ids (if there are exact number of values) or exact value (if it value was written in text field)
        value: ComponentElemAttribValue // [4, 6] OR 'banner'
    }

    export type ComponentElemAttribId = number // 1
    export type ComponentElemAttribValue = number[] | string // [4, 6] OR 'banner'

    export type ElemChildren = (Component | TextComponent)[]

    // =================================================================================================================


    // Text component
    export type TextComponent = {
        type: 'textComponent'
        // Component data id
        dataCompId: DataCompId // 2
        // Component template id
        tempCompId: TempCompId // 'fhd-009-dfd-mvpo'
        // id элемента шаблона чтобы понимать откуда брать данные по тегам и атрибутам
        tempElemId: TempElemId // 'banner'
        // Layer settings
        layer?: Layer
        children?: TextChildren
    }

    export type TextChildren = TextChild[]
    export type TextChild = Component | TagObject | TextObject

    export type TagObject =  {
        type: 'textTag'
        // id тега, в который завернут контент
        tag: Tag
        attribs?: Attribs
        children?: TextChildren
    }

    export type TextObject =  {
        type: 'text'
        text: string
    }
}

export default ArticleTypes


export const emptyArticleData: ArticleTypes.Article = {
    meta: {
        // Max component id to understand what component id must be next
        maxComponentId: 0
    },
    // Components array
    components: []
}


