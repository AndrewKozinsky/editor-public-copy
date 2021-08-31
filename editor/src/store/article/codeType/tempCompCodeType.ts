namespace TempCompTypes {
    export type TempComps = TempComp[]

    // Компонент
    export type TempComp = {
        // Уникальный, в пределах сайта, id шаблона компонента. Он нужен для связи шаблона и данных генерируемых редактором. Этот же id используется в Сборщике.
        uuid: UuId // 4634r347436463
        // Имя компонента показываемое на панеле выделенного корневого тега и на панели создания компонента
        name: Name // 'Баннер'
        code: Code
    }

    // Component template id
    export type UuId = string

    // Component template name
    export type Name = string

    // Код компонента
    export type Code = {
        // HTML шаблона. В атрибуте data-em-id указывается идентификатор элемента
        html: string // `<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>`
        elems?: Elems
    }

    // Массив элементов компонента
    export type Elems = Elem[]

    // Элемент компонента
    export type Elem = {
        // Уникальный, в пределах компонента, идентификатор элемента. Он связывает значение указанное в атрибуте data-em-id.
        tempElemId: TempElemId // 'banner'
        name: string // 'Ячейка'
        // Массив атрибутов
        attribs?: ElemAttribs
        tags?: {
            values?: Tags,
            view?: InputType
        }
        //  Показывать ли данный элемент в статье по умолчанию
        hidden?: boolean // true
        // Можно ли дублировать данный элемент (true по умолчанию)
        canDuplicate?: boolean // false
        // Нужно ли в элемент добавить пустой текстовый компонент для удобного набора
        textInside?: boolean // true
        text?: Text
    }

    export type TempElemId = string // 'banner'

    export type ElemAttribs = ElemAttrib[]

    export type ElemAttrib = {
        // id атрибута. Это требуется чтобы различать одинаковые атрибуты. Например два класса.
        id: number // 1
        // Имя атрибута
        name: string // 'class'
        // Alternative attribute name
        alt?: string // 'Класс'
        // В каком виде значения атрибута будут показываться на панеле выделенного элемента. Пока есть такие варианты: checkbox, radio, select, text
        view?: InputType // 'text'
        // Значение атрибута, которое всегда будет присутствовать.
        lockedValue?: string // 'banner '
        // Массив с предопределенными значениями атрибута. Они будут показаны если в качесте отображения используются поле любого типа кроме text.
        values?: ElemAttribValues
    }

    export type ElemAttribValues = ElemAttribValue[]

    export type ElemAttribValue = {
        // Идентификатор атрибута. Он нужен чтобы можно было удалять и менять значения атрибутов не завися от самого значения. Можно ввести только цифры.
        id: number // 1
        // Название класса
        value: string  // 'pattern-1'
        // Alternative class name
        alt?: string  // 'Восточный узор',
        // Отмечено ли данное значение атрибута при создании компонента
        checked?: boolean // true
    }

    export type Tags = Tag[]

    export type Tag = {
        // Tag identifier. Он нужен чтобы можно было менять значения тега не завися от самого значения. Можно ввести только цифры.
        id: number // 1
        // Tag name
        name: string // 'h1'
    }

    export type Text = {
        // Allowed tags for use
        tags?: TextTags
        attribs?: TextAttribs
    }

    export type TextTags = TextTag[]

    export type TextTag = {
        id: number // 1
        name: string // 'p'
    }

    export type TextAttribs = TextAttrib[]

    export type TextAttrib = {
        id: number // 1
        // Attribute name
        name: string // 'class'
        // Alternative attribute name
        alt?: string // 'Класс'
        // In what view attribute value will be shown in the text panel
        view?: InputType
        // An attribute value that will always be present
        lockedValue?: string // 'banner '
        values?: TextAttribValues
    }

    export type TextAttribValues = TextAttribValue[]

    export type TextAttribValue = {
        // Attribute identifier. Он нужен чтобы можно было удалять и менять значения атрибутов не завися от самого значения.
        id: number // 1
        // Attribute name
        value: string // 'pattern-1'
        // Alternative attribute name
        alt?: string // 'Узор 1'
        // Отмечен ли данный класс при создании компонента
        checked?: boolean // true
    }

    export type InputType = 'text' | 'radio' | 'checkbox' | 'select'
}


export default TempCompTypes