import {Router} from 'express';

const user = Router();


user.post('/', (req,res)=>{
    res.send('create User');
});

user.put('/recover', (req,res)=>{
    res.send('update User');
});

user.put('/', (req,res)=>{
    res.send('update User');
});

user.delete('/', (req,res)=>{
    res.send('delete User');
});

export default user;