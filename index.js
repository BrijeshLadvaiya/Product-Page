const express=require("express");
const PORT=8000;
const app=express();
const handlebars=require("express-handlebars");
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/jsondata/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));


app.set('view engine', 'hbs');

app.engine("hbs",handlebars({
    layoutsDir:`${__dirname}/views/layouts`,
    extname:"hbs",
    defaultLayout:"index",
    partialsDir:`${__dirname}/views/partials`
}))

app.get("/",(req,res)=>{
    res.render("main");
});

app.get("/products",(req,res)=>{
    // console.log(dataObj[1]);
    res.render("products",{datas:dataObj});
});

app.get("/product/:id",(req,res)=>{
    // console.log(re);
    // res.send("I am Foo with id " + req.params.id);
    res.render("product",{layout:"productpage",data:dataObj[req.params.id]});
})

app.use( (req,res,next)=>{
    res.render("404");
})
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

