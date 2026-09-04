// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ProductRegistry {
    struct Product {
        uint256 id;
        string name;
        string manufacturer;
        uint256 timestamp;
        address registeredBy;
        bool isAuthentic;
    }

    struct Checkpoint {
        string location;
        string handler;
        string status;
        uint256 timestamp;
    }

    uint256 public productCount;
    mapping(uint256 => Product) public products;
    mapping(uint256 => Checkpoint[]) public checkpoints;
    mapping(uint256 => string) public ipfsHashes;

    event ProductRegistered(uint256 indexed id, string name, address registeredBy);
    event CheckpointAdded(uint256 indexed productId, string location, string status);

    function registerProduct(string memory _name, string memory _manufacturer, string memory _ipfsHash) public returns (uint256) {
        productCount++;
        products[productCount] = Product(productCount, _name, _manufacturer, block.timestamp, msg.sender, true);
        ipfsHashes[productCount] = _ipfsHash;
        emit ProductRegistered(productCount, _name, msg.sender);
        return productCount;
    }

    function addCheckpoint(uint256 _productId, string memory _location, string memory _handler, string memory _status) public {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        checkpoints[_productId].push(Checkpoint(_location, _handler, _status, block.timestamp));
        emit CheckpointAdded(_productId, _location, _status);
    }

    function getProduct(uint256 _productId) public view returns (Product memory) {
        require(_productId > 0 && _productId <= productCount, "Product does not exist");
        return products[_productId];
    }

    function getCheckpoints(uint256 _productId) public view returns (Checkpoint[] memory) {
        return checkpoints[_productId];
    }
}