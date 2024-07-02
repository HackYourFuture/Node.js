const express=require('express');
//create a user object
const users=[
  {id:1,name:"John",place:"USA"},
  {id:2,name:"Jessica",place:"UK"},
  {id:3,name:"peter",place:"Canada"}
];

const app=express();
const PORT=5000
app.use(express.json());
app.get('/users',(req,res)=>{
  res.json(users);
});
app.post('/users',(req,res,next)=>{  
  console.log(req.body);
    const user=req.body
  users.push(user);
res.json({
 success:true,
  data:users
});
})


app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
});