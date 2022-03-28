import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/Airdrop.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const contractAddress = "0x8BDecF7621c23493991f631B29Ca5053c0546687";
  const contractABI = abi.abi;
const approveABI = ["function approve(address _spender, uint256 _value) public returns (bool success)"];
  var tokenAddress;
  var provider;
  var signer;
  var AirdropContract;
  let Addresses = new Array();
  let Amounts = new Array();
  
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }

    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  const init = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        tokenAddress = document.getElementById("token").value;
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        AirdropContract = new ethers.Contract(contractAddress, contractABI, signer);
        let contract = new ethers.Contract(tokenAddress, approveABI, signer);
        //console.log(document.getElementById("csvFile").files[0]);
        let splits = document.getElementById("address").value.split(/[\n,]+/);
        //document.getElementById("address").value.split(',');
        for (var i = 0; i < splits.length; i++) {
          if(splits[i].startsWith(0)) {
          Addresses.push(splits[i]);
          }
          else {
          Amounts.push(splits[i]);
          }
        }
         console.log(Addresses);
        console.log(Amounts);
        //Addresses.push(splits);
        let addressAmt = splits.length;
        var exp = ethers.BigNumber.from("10").pow(18);
        let amount = String(document.getElementById("amount").value * addressAmt * exp);

        await contract.approve(contractAddress, amount);
      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

const airDrop = async () => {

  await init();
  //let accounts = ethers.getAccount();
  console.log('From Airdrop', await AirdropContract.owner()); 
  let amount = document.getElementById("amount").value;
 // for (var i = 0; i < Addresses.length; i++) { 
    const options = {
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
    };
    try {
      console.log('Airdrop started');
      let r =await AirdropContract.dropTokens(tokenAddress,Addresses,amount,options);
      console.log(r);
      console.log("Allocation + transfer was successful.", r.gasUsed, "gas used. Spent:", r.gasUsed * gasPrice, "wei");

      
    }
    catch (err) {
      console.log(err);
    }
 // }
  Addresses.splice(0, Addresses.length);
  Amounts.splice(0, Amounts.length);
  console.log('Airdrop done.')
  return;
}

 

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hello!
        </div>

        <div className="bio">
          Airdrop Dapp. Connect MetaMask!
        </div>
        <td><b>Token Address:</b></td>
        <td><input type="text" id="token" width="400" /></td>
        <td><b>Addresses:</b></td>
       <td><input type="text" id="dress" height="400" width="400" /></td>
        <textarea rows="5" cols="80" id="address">
</textarea>
        <td><b>Amount:</b></td>
        <td><input type="text" id="amount" width="400" /></td>
        
        <button className="dropButton" onClick={airDrop}>
          Execute!
        </button>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="Button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

          <form id="myForm">
    <input type="file" id="csvFile" accept=".csv" />
    <br />
    <input type="submit" value="Submit" />
  </form>

      </div>
    </div>
  );
}

export default App