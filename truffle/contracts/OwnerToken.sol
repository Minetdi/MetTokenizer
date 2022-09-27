// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract OwnerToken is ERC20, ERC20Detailed {

    constructor(uint initSupply) ERC20Detailed("Mega hat", "MHA", 10) public {
        _mint(msg.sender, initSupply);
    }
}
