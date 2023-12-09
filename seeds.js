// so in this file we are basically requiring mongoose and reqiuring the model
//then connect to mongoose with no web app involved ,no server and no express
//this is a file that i will run on IT'S OWN jab mujhe new data db mein daalna hai
// so we are 'SEEDing' database seperately from your web app

const mongoose=require('mongoose');
const Product=require('./models/product');


// import Product from './product';

mongoose.connect('mongodb://127.0.0.1:27017/BakingStore')
.then(()=>{
  console.log("mongo connection open!!")
})
.catch(err=>{
  console.log("oh no mongo error!!")
  console.log(err)
})

// const p = new Product({
//   name:'flour',
//   price:50,
//   category:'ingredient'
// })

// p.save()
// .then(p=>{
//   console.log(p)
// })
// .catch(e=>{
//   console.log(e)
// })
const seedProducts = [
  {
      name: "Whisk",
      price: 100,
      category: "tool"
  },
  {
      name: "Stand Mixer",
      price: 13000,
      category: "appliance"
  },
  {
      name: "Vanilla Essence",
      price: 50,
      category: "ingredient"
  },
  {
      name: "Chocolate chips",
      price: 150,
      category: "ingredient"
  },
  {
      name: "Butter",
      price: 30,
      category: "ingredient"
  }
];

Product.insertMany(seedProducts)
.then(res=>{
  console.log(res);
})
.catch(e=>{
  console.log(e);
})