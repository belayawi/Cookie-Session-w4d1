
const express = require('express');

const path = require('path');

const session = require('express-session');

const Product = require('./product');;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'view'));
app.use('/css', express.static(path.join(__dirname,'css')));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
    secret:'It is always fun',
    saveUninitialized:false,
    resave:true
}));
app.use((req, res, next)=>{
    if(!req.session.items){
        req.session.items=[];
    }
    next();
});

const products =[
    new Product("Chair", 25.9,"To sit on.", 200 ),
    new Product("Light",8.6, "To see things.", 394 ),
    new Product("Table", 255.99,"To put things on.", 302 ),
    ];

    let items =[];

    let carts =[];


    app.get('/',(req, res)=>{
        
        res.render('product',{products: products});
    });

    app.get('/cart', (req, res)=>{
        carts=req.session.items;
        res.render('cart',{carts});
    })

    app.post('/addToCart',(req, res)=>{
        console.log(req.body);
        // req.session.cart =items;
        // let item = req.body.item;
        // req.session.cart.push(item);
        // console.log(item)
        req.session.items.push(req.body.item);
        res.redirect('/');  
    });

    app.get('/cart',(req, res)=>{
        res.render('shoppingCart',{items:items})
    });
    
app.listen(3000);

