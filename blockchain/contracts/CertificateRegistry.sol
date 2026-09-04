// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CertificateRegistry {
    enum CertStatus { Active, Revoked }

    struct Certificate {
        uint256 id;
        string recipientName;
        string courseName;
        string issuerName;
        string ipfsHash;
        uint256 issuedAt;
        CertStatus status;
        address issuedBy;
    }

    uint256 public certCount;
    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public authorizedIssuers;
    address public owner;

    event CertificateIssued(uint256 indexed id, string recipientName);
    event CertificateRevoked(uint256 indexed id);

    modifier onlyOwner() { require(msg.sender == owner, "Only owner"); _; }
    modifier onlyAuthorized() { require(authorizedIssuers[msg.sender] || msg.sender == owner, "Not authorized"); _; }

    constructor() { owner = msg.sender; authorizedIssuers[msg.sender] = true; }

    function issueCertificate(string memory _recipientName, string memory _courseName, string memory _issuerName, string memory _ipfsHash) public onlyAuthorized returns (uint256) {
        certCount++;
        certificates[certCount] = Certificate(certCount, _recipientName, _courseName, _issuerName, _ipfsHash, block.timestamp, CertStatus.Active, msg.sender);
        emit CertificateIssued(certCount, _recipientName);
        return certCount;
    }

    function verifyCertificate(uint256 _certId) public view returns (Certificate memory cert, bool isValid) {
        require(_certId > 0 && _certId <= certCount, "Not found");
        cert = certificates[_certId];
        isValid = cert.status == CertStatus.Active;
    }

    function revokeCertificate(uint256 _certId) public onlyAuthorized {
        require(_certId > 0 && _certId <= certCount, "Not found");
        certificates[_certId].status = CertStatus.Revoked;
        emit CertificateRevoked(_certId);
    }
}