// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Airdrop is Ownable {

    address public tokenAddr;
    uint256 public amount;
    address private contractAddr = address(this);

    event EtherTransfer(address beneficiary, uint amount);
    
   
    function dropTokens(address _tokenAddr, address[] memory _recipients, uint256 _amount) public onlyOwner returns (bool) {
       	amount = _amount * 10**18;
        tokenAddr = _tokenAddr;
        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));
            require(IERC20(tokenAddr).allowance(msg.sender, contractAddr) > 0, "fail");
            require(IERC20(tokenAddr).transferFrom(msg.sender, _recipients[i], amount), "no transfer");
        }

        return true;
    }
}
