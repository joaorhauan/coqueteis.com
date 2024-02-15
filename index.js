import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));

const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const cocktail_config = {apiKey: 1}

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.post('/ingredientes_esp', async (req,res) => {
    const ingrediente_esp = req.body.ingrediente_esp;
    if (!ingrediente_esp) {
        res.redirect('/');
    } else {
        try {
            const response = await axios.get(COCKTAIL_API_URL + 'filter.php?i=' + ingrediente_esp, cocktail_config);
            if (response.data){
                res.render('ingrediente_esp.ejs', {data: response.data});
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error.message)
            res.redirect('/');
        }
    }
})

app.post('/drink_esp', async (req,res) => {
    const drink_id = req.body.drink_id;
    try {
        const response = await axios.get(COCKTAIL_API_URL + 'lookup.php?i=' + drink_id, cocktail_config );
        res.render('drink_esp.ejs', {data: response.data})
    } catch (error) {
        console.error(error.message)
        res.redirect('/')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})