import crypto from 'crypto'

interface block {
  index: number
  timestamp: Date
  nonce: number
  data: number
  previous_hash: string
}

export class Blockchain {
  public chain: block[] = []
  public transaction = 0 

  constructor() {
    // genesis block
    this.create_block(this, 1, "0")
  }

  create_block(self: Blockchain, nonce: number, previous_hash: string) {
   const block = {
      index: self.chain.length + 1,
      timestamp: new Date(),
      nonce: nonce,
      data: self.transaction,
      previous_hash: previous_hash,
    }
    self.chain.push(block)

    return block
  }

  get_previous_block(self: Blockchain) {
    return self.chain[this.chain.length - 1]
  }   

  hash(current_block: block) {
    return crypto.createHash('sha256').update(JSON.stringify(current_block)).digest('hex')
  }

  proof_of_work(previous_nonce: number) {
    let new_nonce = 1 
    let check_proof = true

    while (check_proof) {
      const hash_operation = crypto.createHash('sha256').update(((new_nonce^2) - (previous_nonce^2)).toString()).digest('hex')
      if (hash_operation.substring(0,4) === "0000") {
        check_proof = false
      }
      else {
        new_nonce += 1
      }
      console.log(new_nonce)
    }
    
    return new_nonce
  }

  is_chain_valid(self: Blockchain, chain: block[]) {
    let previous_block = chain[0]
    let block_index = 1

    while (block_index < chain.length) {
      const block = chain[block_index]

      if (block.previous_hash != self.hash(previous_block)) {
        return false
      }

      const previous_nonce = previous_block.nonce
      const nonce = block.nonce 
      const hash_operation = crypto.createHash('sha256').update(((nonce^2) - (previous_nonce^2)).toString()).digest('hex')

      if (hash_operation.substring(0,4) !== "0000") {
        return false
      }

      previous_block = block
      block_index += 1
    }

    return true
  }
}
