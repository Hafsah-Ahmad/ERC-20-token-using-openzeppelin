 Shitzu Token  — OpenZeppelin Version

This is the "OpenZeppelin implementation" of the Shitzu Token (SHIT).  
It uses ERC20, ERC20Capped, ERC20Burnable, Pausable, and Ownable from OpenZeppelin, with additional freeze/unfreeze functionality.

---

 Features=
- ERC20 Standard
- Capped Supply: 20,000,000 SHIT tokens  
- Burnable: `burn` and `burnFrom`  
- Pausable: `pause` and `unpause`  
- Ownership: `transferOwnership`, `renounceOwnership`  
- Freeze/Unfreeze Accounts  

---

 Tech Stack
- [Hardhat](https://hardhat.org/) — development & testing framework  
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)  



Installation & Setup
```bash
git clone "https://github.com/Hafsah-Ahmad/ERC-20-token-using-openzeppelin/tree/main"
cd ERC-20-token-using-openzeppelin
npm install
Install OpenZeppelin:

bash
Copy code
npm install @openzeppelin/contracts
Compile:

bash
Copy code
npx hardhat compile
Test:

bash
Copy code
npx hardhat test
Deploy (default local network):

bash
Copy code
npx hardhat run scripts/deploy.js
🧪 Example Tests
Run unit tests:

bash
Copy code
npx hardhat test
Tests cover:

Token details (name, symbol, decimals)

Total supply minted to owner

Transfers, approvals, and transferFrom

Burn tokens

Pause & unpause transfers

Freeze & unfreeze accounts

This project is licensed under the MIT License.

👩‍💻 Author
Created by Hafsa Ahmad
📧 Email: hafsa.ahmad043@gmail.com
🌐 GitHub: Hafsah.Ahmad

hi
