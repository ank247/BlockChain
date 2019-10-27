# Blockchain

Neural Network based Blockchain

Interview:
    
    1. Develop consensus using Web3 for dumping or adding blocks.
    2. Questions will be asked based on the protocols/algos used for the successful of the following consensus.
    3. Questions using those protocols will be asked.

links:
      
    1. [Complete Block explanation]: https://en.bitcoin.it/wiki/Dump_format#CBlock
    2. obtain Test-net coin: https://coinfaucet.eu/en/btc-testnet/
    3. Tracking transaction hashes: https://live.blockcypher.com/btc-testnet/

BLOCKS
     
 Problem faced:
 
    ASG1:

   1. Setup could not do in 1st attempt.
   2. Could not relate the input in ex1.py with that to be put in blockcypher online.
   3. Integer format of BTC to be kept in 
        
    Solution
   
     Private key: cPoTjeTeZfWKycFMktDvimL3Dn4h3VL39xfkC9gA7Bb4Fc94i1Lx
     Address: mgZMyfSQvNtQCEiFuZdn3ASmzpwmEeQMct
     tx: 63c1468145ea08fd0f7877b84e849b028a0c11a149c971d125ecddc4a378d26a


# bitcoin

1.Transactions:

Challenges:

    1. Verification of Double-Spend(Multiple signing of the same block) check on Transactions
    
Solution: 

         1. The Transactions should use third-party for verification.
         2. The majority of nodes agree with the received transaction is first by the following Payee. 

2.Timestamp Server:

Solution for Double-Spend:
    
    1. The timestamp attached indicates that the Transaction would have been signed at some earlier timestamp.
    
3.Proof-of-Work:

Target:
    
    1. Increase difficulty for Proof-of-Work so that the transactions stored in blocks by each node could be 
       allowed to passby other participating nodes.

Solution for:
 
    1. Determining representation in majority decision making.
  
Challenges:
    
    1.If 1-IP 1-Vote given for majority, multiple IPs comes into picture by a single client.
    2.The compensation in hardware speed and varying in interest of speed of blocks for nodes 
      leads to difficulty of Proof-of-Work(PoW).  
    
Solution:[Dominancy][Super-admin concept creation]

    1. 1-CPU-1-Vote: CPU power allocation to the one-honest node reduces capability of adversary nodes by CPU-power.
    2. For decremention of PoW for hardware speed of honest node, there is fixing of average nos. of blocks per hour. 

4. Network Setup:
   
Principles:
       
    1. Longest chain of blocks are acceptable.
    2. #Creation:The node finding best and soonest Proof-of-Work, i.e, honest node, transfers block 
       with hashes to every node. The nodes accept it only with no blocks are spent(doubly signed).
    3. #Acceptance:The other node on getting PoW for the block passing through it, add an extra block 
       to the chain with hash generated using hashes from the previous block w.r.t it.
    4. #Rejection:If any block in the chain found not validating PoW, the complete chain is rejected.
    5. #Tie:Throughout the process, there could be more than a chain running throughout the nodes. If
       2nd time PoW is found,the 'Tie' among multiple break and it follows longer chain out of existing.
    6. The new blockchain must not be passing by all the nodes again. The nodes not getting the chain
       raise request for the chain.
    
5. Incentive:
6. Reclaiming Disk Spaces:
7. Simplified Payment Verification:
8. Combining and Splitting Values:
9. Privacy:
10.Calculation:

# Ideation:
1. Gold Miners(sooner PoW generator): Paid with incentives from needing nodes for transaction. Each nodes paid 
   for less than or equal to ether transacted valued product with Gold Miners with extra bonus. The minter will
   be having high CPU-power node to earn more gold coin.
   
2.

    
