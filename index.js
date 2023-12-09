const express=require('express');
const app=express();
const path=require('path');
//importing mongoose
const mongoose=require('mongoose');
const methodOverride=require('method-override')

const Product=require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/BakingStore')
.then(()=>{
  console.log("mongo connection open!!")
})
.catch(err=>{
  console.log("oh no mongo error!!")
  console.log(err)
})



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const categories =['tool','ingredient','appliance','clothing'];

//adding routes
app.get('/products',async (req,res)=>{
  const {category}=req.query;
  if(category){
    const products=await Product.find({category:category})
    res.render('products/index',{products,category})

}else{
    const products=await Product.find({})
    res.render('products/index',{products,category:'All'})
    
  }
  })

app.get('/products/new',(req,res)=>{
  res.render('products/new',{ categories })
})

app.post('/products',async(req,res)=>{
// console.log(req);
// res.send("made a new prod")
const newProd=new Product(req.body);
await newProd.save();
res.redirect(`/products/${newProd._id}`)
})


app.get('/products/:id',async(req,res)=>{
  const {id}=req.params;
  const product=await Product.findById(id);
  // console.log(product);
  res.render('products/show',{ product})

})

app.get('/products/:id/edit',async(req,res)=>{
  const {id}=req.params;
  const product=await Product.findById(id)
  res.render('products/edit',{product})
})

app.put('/products/:id',async(req,res)=>{
const {id}=req.params;
const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id',async(req,res)=>{
  const {id}=req.params;
  const deletedProduct=await Product.findByIdAndDelete(id);
  res.redirect('/products');
  
})


app.listen(3000,()=>{
  console.log("APP IS LISTENING on port 3000");
})