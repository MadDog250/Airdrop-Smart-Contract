# Auto Airdrop Smart Contract for Binance Smart Chain and Ethereum

This smart contract and airdrop.js code will help you to airdrop your BSC/Ethereum Tokens. Also has test.js that imbeds html code for website template to further develop fully functional airdrop Dapp.

### Micro Documentation
We are using truffle framework for smart contract development and deployment. For auto airdrop we are using node.js script with web.js for smart contract interation. Another file, test.js, uses ethers.js to interact with Dapp.

#### Files and usage
##### contracts/Airdrop.sol
This is our Main Contract file which you need to deploy. You can customize contract as per your requirement.

##### migrations/1_initial_migration.js
If you update Smart Contract to take constructor parameters, you need to specify in this file.

##### src/airdrop.csv
List of Addresses you want to airdrop tokens to. (Sample file included, you can also download list from bscscan,etherscan)

##### src/airdrop.js
This is a node script to interect with deployed airdrop smart contract. It reads list of airdrop beneficiaries and airdrops token in batch size you have specified. in ```init3``` function you need to specify deployed smart contract address.

##### src/test.jsx
This is a node script tested using replit. Does approval from metamask and takes user input of addresses and amount to send with a UI.

##### .env
File which contains 12 secret mnemonic phrases of your hd wallet in SEED_PHRASE variable.

#### Commands to deploy and airdrop

##### Deploy smart contact
 - ```npm install```
 - Copiling smart contract ```truffle compile```
 - Deploying smart contract - ```truffle migrate --network=testnet``` Choose network from ```truffle-config.js``` file.
 - Verify smart contract on bscscan/etherscan (API Keys are needed)- ```truffle run verify Airdrop@{ContractAddress} --network testnet```
 - Once smart contract is deployed and verified, you can interect it from bscscan/etherscan

##### Approve
 - If using airdrop.js approve smart contract to send alloted tokens.
 - If using test.jsx user will be prompted to approve when selecting 'Execute' button on UI.

##### Token Airdrop
 -If airdrop.js 
    - Goto src directory
    - Update Contract Address in .env file.
    - Update BATCH_SIZE (how many accounts at a time you want to do airdrop) in .env
    - Run ```node airdrop.js```
    - Done Script will start airdroping tokens. Dont forget to set gas price you want and maintain balance into your wallet.
    
 -If test.jsx
    - After prompted to aprrove use of token when selecting 'Execute', Dapp should execute airdrop.

## Authors

* Michael Maher
* Hiren Kavad

## License

This bundle is dual-licensed under MIT and GPL licenses.

* [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
* [http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)
