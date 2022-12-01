import { ethers } from 'ethers'

export let owner;
/**
 * Deploy the given contract
 * @param {string} contractName name of the contract to deploy
 * @param {Array<any>} args list of constructor' parameters
 * @param {Number} accountIndex account index from the exposed account
 * @return {Contract} deployed contract
 */


export const launch = async (contractName: string, args: Array<any>, accountIndex?: number): Promise<ethers.Contract> => {    

    console.log(`launching project ${contractName}`)
    // Note that the script needs the ABI which is generated from the compilation artifact.
    // Make sure contract is compiled and artifacts are generated
    const artifactsPath = `contracts/artifacts/${contractName}.json` // Change this for different path

    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    // 'web3Provider' is a remix global variable object
    
    const signer = (new ethers.providers.Web3Provider(web3Provider)).getSigner(accountIndex)

    const contract = new ethers.Contract('0x05a4f523f8dBD083FAEC7329337EEb798f705463', metadata.abi, signer)

    const launch = await contract.dropTokens(...args) 
    
    return launch

}
