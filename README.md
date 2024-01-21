# A Decentralized Loans Program on Ethereum using Smart Contracts
This project is an implementation of how a decentralized Loans platform may work on ethereum. Cutting the need for a bank to middleman and loan out depositors money.



Deployment in Test Environment:

To run the node input the command
```shell
npx hardhat node
```

Deploy Scripts with
```shell
npx hardhat run scripts/{script.js} --network localhost
```

Interact with contracts with:
```shell
npx hardhat console --network localhost
> const hre = require("hardhat")
> const Contract = await hre.ethers.getContractFactory('ContractName')
> const contract = await Contract.attach('address')
> await contract.function()
```

Created by David Piedra