
const express = require('express');

const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views') );
app.use("/css",express.static("css"));

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

let items = [];

app.get('/',(req, res)=>{
    console.log(req.cookies);

    // items=req.cookies;
    res.render('index',{items});
});

app.post('/add',(req, res)=>{
    if(req.body.key && req.body.value){
        let key = req.body.key;
        let value= req.body.value;
        let item ={key:key, value:value};
        res.cookie(key, value, value, value);
        items.push(item);  
        console.log(item)   
    }
    res.redirect('/');

});

app.listen(3000,(req, res)=>{
    console.log('Item is added ')
})



