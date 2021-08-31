# Записная книжка
Личный проект, делаю для себя в свободное время. Тут можно будет писать не просто текст, а HTML для выделения важный блоков.

Публикую этот код чтобы вы смогли посмотреть его качество и оценить мои актуальные знания и принципы по которым я его пишу.

Вам не удастся запустить проект потому что я убрал некоторую конфиденциальную информацию вроде данных по подключению к базе данных и логин и пароль для доступа к сервису массовой отправки почты.

## Инструменты

### Инфраструктура
Контейнеры Docker-а в docker-compose. Маршрутизатор — Nginx. 

### Серверная часть
В качестве сервера использовал Node.

Для написания API изначально использовал Express в связке с Mongo.
Потом переписал на Nest с Postgres-ом. Просто хотел попробовать как оно. С Монгой поменьше геморроя, тем более я не собираюсь как-то по-особому нагружать базу, поэтому без разницы что использовать. На первом месте стоит удобство.

### Клиентская часть
React с TypeScript. Самописная сборка ВебПака. Стили на SCSS. Маршрутизация React-Router.

## Решения

### Обработчик форм
Изначально для работы с формами планировал использовать Formic. Но мне не нравится его концепция записывания в атрибуты формы функцию, в которую нужно передавать форму. Там есть более элегантное решение с хуком, но в нём нет важных методов, поэтому для меня он бесполезен.

Поэтому решил сделать свою реализацию. Она состоит их трёх составляющих:
1. Объект с настройками полей и общей работы формы.
2. Вызова хука для создания Местного хранилища (так же он возвращает объект с полезными методами управления формой).
3. Компонента <FormConstructor /> в который передаётся объект с настройками полей и Местное хранилище. Компонент возвращает сгенерированную разметку полей и реализует логику работы формы.

Поэтому минимальную форму можно сделать за ≈ 30 строк.

### Компонент структуры статей
Наиболее подходящее решение react-sortable-tree не установилась на 17-ю версию Реакта. А других библиотек не нашёл. Поэтому написал свою реализацию.

Я написал возможность удаления и выделения папок/статей, изменения местоположения с обновлением данных в базе данных. 