import express from 'express'
import { Blockchain } from './blockchain'

const app = express()
const port = 3000
const blockchain = new Blockchain()

app.get('/getchain', async(req, res) => {
   res.send({
       chain: blockchain.chain,
       length: blockchain.chain.length,
   })
})

app.get('/mining', async(req, res) => {
    const amount = 1000000 
    blockchain.transaction = blockchain.transaction + amount

    const previous_block = blockchain.get_previous_block(blockchain)
    const previous_nonce = previous_block.nonce
    const nonce = blockchain.proof_of_work(previous_nonce)
    const previous_hash = blockchain.hash(previous_block)
    const block = blockchain.create_block(blockchain, nonce, previous_hash)

    const data = {
        message: "Mining Block Success",
        index: block.index,
        timestamp: block.timestamp,
        data: block.data,
        nonce: block.nonce,
        previous_hash: block.previous_hash,
    }

    res.send(data)
})

app.get('/validatechain', async(req, res) => {
    const is_valid = blockchain.is_chain_valid(blockchain, blockchain.chain)

    if(is_valid) {
        res.send({ message: "Blockchain is valid" })
    }
    else {
        res.send({ message: "Blockchain is not valid" })
    }

})

app.listen(port, () => {       
    console.log( `server started at http://localhost:${port}`)
})