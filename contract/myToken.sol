// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20Capped, ERC20Burnable, Pausable, Ownable {
    mapping(address => bool) private frozenAccounts;

    event Frozen(address indexed account);
    event Unfrozen(address indexed account);

    constructor()
        ERC20("Shitzu", "SHIT")
        ERC20Capped(20000000 * 10 ** 18) // 20 million cap
        Ownable(msg.sender)
    {
        _mint(msg.sender, cap()); // Mint full supply to deployer
    }

    // 🔹 Override _update to enforce cap, pause, and freeze
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Capped) whenNotPaused {
        require(!frozenAccounts[from], "Sender account is frozen");
        require(!frozenAccounts[to], "Recipient account is frozen");
        super._update(from, to, value);
    }

    // 🔹 Pause / Unpause
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // 🔹 Freeze / Unfreeze
    function freeze(address account) external onlyOwner {
        frozenAccounts[account] = true;
        emit Frozen(account);
    }

    function unfreeze(address account) external onlyOwner {
        frozenAccounts[account] = false;
        emit Unfrozen(account);
    }

    function isFrozen(address account) external view returns (bool) {
        return frozenAccounts[account];
    }
}
