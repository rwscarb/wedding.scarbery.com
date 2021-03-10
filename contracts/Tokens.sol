pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract WeddingToken is ERC20, ERC20Detailed {
    constructor() ERC20Detailed("WeddingToken", "WED", 0) public {
        _mint(msg.sender, 100);
    }
}

contract WeddingInvitationToken is ERC20, ERC20Detailed {
    constructor() ERC20Detailed("WeddingInvitation", "Invitation", 0) public {
        _mint(msg.sender, 100);
    }
}

contract WeddingWitnessToken is ERC20, ERC20Detailed {
    constructor() ERC20Detailed("WeddingWitness", "Witness", 0) public {
        _mint(msg.sender, 100);
    }
}
