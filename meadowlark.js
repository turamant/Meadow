const express = require('express');
// const expressHandlebars = require('express-handlebars');
const { engine: expressHandlebars } = require('express-handlebars')

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 3000;


app.get('/', (req, res)=> res.render('home'));


fortunes = [
    "Победи свои страхи , или они победят тебя ." ,
    "Рекам нужны истоки ." ,
    "Не бойся неведомого ." ,
    "Тебя ждет приятный сюрприз ." ,
    "Будь проще везде , где только можно ." ,
]

app.get('/about',(req, res)=>{
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
})

// Пользовательская страница 404
app.use((req, res) =>{
    res.status(404);
    res.render('404');
})

// Пользовательская страница 500
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(`Express запущен на порте ${port};` + 'Нажмите Ctrl+C для завершения'))

