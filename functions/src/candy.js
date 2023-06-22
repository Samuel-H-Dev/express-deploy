//CRUD Functions For Candy

import { db } from "./dbConnect.js";
const coll = db.collection("candy");
const toArray = (collection) => collection.docs.map(doc => ({id: doc.id, ...doc.data() }))

export async function getAllCandy (req, res) {
    try{
        const allCandy = await coll.get();
      res.send(toArray(allCandy));
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function addNewCandy (req, res){
    try{
        const newCandy = req.body;
        await coll.add(newCandy);
        getAllCandy(req, res);
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function updateCandyByID (req, res) {
    try{
        const { candyID } = req.params;     //which candy are we changing
        const updatedInfo = req.body;       //what are we changing 
        await coll.doc(candyID).update(updatedInfo)     //updates the info in said candy doc
        getAllCandy(req,res);
    }
    catch (err){
        res.status(500).send(err)
    }
}