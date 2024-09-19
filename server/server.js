import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

//const uri = "mongodb+srv://anupama:anupama@amanupa.7dj9s.mongodb.net/?retryWrites=true&w=majority"

//const { MongoClient, ServerApiVersion } = require("mongodb");


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// }
// );

async function run() {
    try {
        await client.connect();
        await client.db("movies").find({});
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


const app = express()
app.use(express.json())
app.use(cors())

const db = []


app.get("/", (req, res) => {
    res.json("hello user")
})


app.post("/reg", async (req, res) => {
    const request = await req.json()
    const { id, memo } = req.body

    console.log(id, memo, req.body);

    if (id) {
        console.log(".");
        if (memo) {
            db.push({ uid: id, todo: memo })
            console.log(db)
            res.json("heigala")
        } else {
            res.json({ err: "memo nahi" })
        }
    } else {
        res.json({ err: "id nahi" })
    }
})



app.post("/getMemo", (req, res) => {
    const { id } = req.body
    if (id) {
        const memos = db.filter((item) => item.uid == id)
        if (memos.length == 0) {
            res.json("bhul id delu")
        } else {
            console.log(memos)
            res.json(memos)
        }
    } else {
        res.json({ err: "id nahi" })
    }
})

app.listen(5000, () => {
    console.log("listineing");

})