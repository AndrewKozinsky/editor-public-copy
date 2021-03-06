# Функция получает три аргумента. В первом нужно указать ссылку на объект с вложенными данными, во втором аргументе передаётся ссылка на объект, который находится в первом объекте. Третьим передаётся объект, на который нужно заменить второй объект. А итоге функция возвращает неизменяемую (immutable) копию объекта из первого аругмента с изменённым объектом из второго аргумента.
Функция не создаёт грубокую копию всего объекта, а копирует только те объекты, которые идут вверх от вложенного объекта до верха. Поэтому измененная копия не влияет на оригинальный объект.

Наряду с объектами функция работает с массивами.

Например есть массив arr_1. Требуется сделать его копию чтобы изменить подмассив по адресу arr_1[2][2][1]. 

    let arr_1 = [
        0,
        [1, 2, 3],
        [ 4,
            [5, 6],
            [
                [7, 8],
                [ 9, 10 ]
            ],
        ]
    ];

    let link = arr_1[2][2][1]; // Ссылка на массив, который требуется заменить на новый.
    let changedArr = [555];    // Новый массив, который заменит link.

В функцию makeImmutableObj передаю ссылки на оригинальный массив, подмассив, который планируется изменять и изменённый массив. Функция возвращает копию.

    let copy = makeImmutableObj(arr_1, link, changedArr);

Проверки равенства элементов массива

    console.log(arr_1 === copy);                   // false (корневой массив скопирован)

    console.log(arr_1[2] === copy[2]);             // false (элемент скопирован потому что он находится на пути от корня к копируемому массиву)

    console.log(arr_1[2][2][0] === copy[2][2][0]); // true  (этот элемент массива копировать не нужно)

    console.log(arr_1[2][2][1] === copy[2][2][1]); // false  (целевой массив, который и будет изменён в коде ниже)

    copy[1][1] = 99;                               // Так как массив copy[1] не скопирован, то он является ссылкой на arr_1[1]. Поэтому число 99 появится в обоих массивах.

    console.log(arr_1[2][2][1][0]); // [9, 10]

    console.log(copy[2][2][1][0]);  // [555]