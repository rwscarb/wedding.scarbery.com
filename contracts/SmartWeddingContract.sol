pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import { WeddingInvitationToken, WeddingWitnessToken } from "./Tokens.sol";


/**
 * @title SmartWeddingContract
 * @dev The contract has both addresses of spouse1 and spouse2. It is capable of handling assets, funds and
 * divorce. A multisig variant is used to consider the decision of both parties.
 */
contract SmartWeddingContract {
  event WrittenContractProposed(uint timestamp, string ipfsHash, address wallet);
  event Signed(uint timestamp, address wallet);
  event ContractSigned(uint timestamp);
  event AssetProposed(uint timestamp, string asset, address wallet);
  event AssetAddApproved(uint timestamp, string asset, address wallet);
  event AssetAdded(uint timestamp, string asset);
  event AssetRemoveApproved(uint timestamp, string asset, address wallet);
  event AssetRemoved(uint timestamp, string asset);
  event DivorceApproved(uint timestamp, address wallet);
  event Divorced(uint timestamp);
  event FundsSent(uint timestamp, address wallet, uint amount);
  event FundsReceived(uint timestamp, address wallet, uint amount);
  event GuestInvited(uint timestamp, address wallet, address from);
  event GuestbookSignatureAdded(uint timestamp, address wallet, string name, string message);
  event GuestAttended(uint timestamp, address wallet);

  bool public signed = false;
  bool public divorced = false;

  address[] invitationList;

  WeddingInvitationToken invitationToken = new WeddingInvitationToken();
  WeddingWitnessToken witnessToken = new WeddingWitnessToken();

  mapping (address => bool) private hasSigned;
  mapping (address => bool) private hasDivorced;
  mapping (address => bool) private isInvited;
  mapping (address => bool) private hasAttended;

  address payable public spouse1Address;
  address payable public spouse2Address;
  string public writtenContractIpfsHash;

  struct Asset {
    string data;
    uint spouse1Allocation;
    uint spouse2Allocation;
    bool added;
    bool removed;
    mapping (address => bool) hasApprovedAdd;
    mapping (address => bool) hasApprovedRemove;
  }

  Asset[] public assets;

  struct GuestBookEntry {
    string name;
    string message;
  }

  GuestBookEntry[] guestBook;

  /**
   * @dev Modifier that only allows invited member execution.
    */
  modifier invited() {
    require(isInvited[msg.sender], "Sender is not invited!");
    _;
  }

  /**
   * @dev Modifier that only allows spouse execution.
    */
  modifier onlySpouse() {
    require(msg.sender == spouse1Address || msg.sender == spouse2Address, "Sender is not a spouse!");
    _;
  }

  /**
   * @dev Modifier that checks if the contract has been signed by both spouses.
    */
  modifier isSigned() {
    require(signed == true, "Contract has not been signed by both spouses yet!");
    _;
  }

  /**
   * @dev Modifier that only allows execution if the spouses have not been divorced.
    */
  modifier isNotDivorced() {
    require(divorced == false, "Can not be called after spouses agreed to divorce!");
    _;
  }

  /**
   * @dev Private helper function to check if a string is not equal to another.
   */
  function isNotSameString(string memory string1, string memory string2) private pure returns (bool) {
    return keccak256(abi.encodePacked(string1)) != keccak256(abi.encodePacked(string2));
  }

  /**
   * @dev Constructor: Set the wallet addresses of both spouses.
   * @param _spouse1Address Wallet address of spouse1.
   * @param _spouse2Address Wallet address of spouse2.
   */
  constructor(address payable _spouse1Address, address payable _spouse2Address) public {
    require(_spouse1Address != address(0), "Spouse1 address must not be zero!");
    require(_spouse2Address != address(0), "Spouse2 address must not be zero!");
    require(_spouse1Address != _spouse2Address, "Spouse1 address must not equal Spouse2 address!");

    spouse1Address = _spouse1Address;
    spouse2Address = _spouse2Address;

    isInvited[spouse1Address] = true;
    invitationList.push(spouse1Address);
    isInvited[spouse2Address] = true;
    invitationList.push(spouse2Address);
  }

  /**
   * @dev Default function to enable the contract to receive funds.
   */
  function() external payable isSigned isNotDivorced {
    emit FundsReceived(now, msg.sender, msg.value);
  }

  function getBalance() external view returns (uint) {
    return address(this).balance;
  }

  /**
   * @dev Invite someone to your wedding
   */
  function sendInvitation(address payable _to) public onlySpouse {
    require(!isInvited[_to], "Person has already been invited!");
    if (invitationToken.balanceOf(address(this)) > 0) {
      invitationToken.transfer(_to, 1);
      isInvited[_to] = true;
      invitationList.push(_to);
      emit GuestInvited(now, _to, msg.sender);
    }
  }

  /**
   * @dev Get address to InvitationToken
   */
  function getInvitationTokenAddress() public view returns (address) {
    return address(invitationToken);
  }

  /**
   * @dev Get address to WitnessToken
   */
  function getWitnessTokenAddress() public view returns (address) {
    return address(witnessToken);
  }

  /**
   * @dev Sign the guest book
   */
  function signGuestBook(string memory name, string memory message) public invited {
    GuestBookEntry memory entry = GuestBookEntry({
      name: name,
      message: message
    });
    guestBook.push(entry);
    emit GuestbookSignatureAdded(now, msg.sender, name, message);
  }

  /**
   * @dev Get guest book entries
   */
  function getGuestBookEntries() public view returns (GuestBookEntry[] memory) {
    return guestBook;
  }

  /**
   * @dev Propose a written contract (update).
   * @param _writtenContractIpfsHash IPFS hash of the written contract PDF.
   */
  function proposeWrittenContract(string calldata _writtenContractIpfsHash) external onlySpouse isNotDivorced {
    require(signed == false, "Written contract ipfs hash can not be changed. Both spouses have already signed it!");

    // Update written contract ipfs hash
    writtenContractIpfsHash = _writtenContractIpfsHash;

    emit WrittenContractProposed(now, _writtenContractIpfsHash, msg.sender);

    // Revoke previous signatures
    if (hasSigned[spouse1Address] == true) {
      hasSigned[spouse1Address] = false;
    }
    if (hasSigned[spouse2Address] == true) {
      hasSigned[spouse2Address] = false;
    }
  }

  /**
   * @dev Sign the contract.
   */
  function signContract() external onlySpouse {
    require(isNotSameString(writtenContractIpfsHash, ""), "Written contract ipfs hash has been proposed yet!");
    require(hasSigned[msg.sender] == false, "Spouse has already signed the contract!");

    // Sender signed
    hasSigned[msg.sender] = true;

    emit Signed(now, msg.sender);

    // Check if both spouses have signed
    if (hasSigned[spouse1Address] && hasSigned[spouse2Address]) {
      signed = true;
      for (uint i = 0; i < invitationList.length; i++) {
        if (witnessToken.balanceOf(address(this)) > 0) {
         witnessToken.transfer(invitationList[i], 1);
        }
      }
      emit ContractSigned(now);
    }
  }

  /**
   * @dev Send ETH to a target address.
   * @param _to Destination wallet address.
   * @param _amount Amount of ETH to send.
   */
  function pay(address payable _to, uint _amount) external onlySpouse isSigned isNotDivorced {
    require(_to != address(0), "Sending funds to address zero is prohibited!");
    require(_amount <= address(this).balance, "Not enough balance available!");

    // Send funds to the destination address
    _to.transfer(_amount);

    emit FundsSent(now, _to, _amount);
  }

  /**
   * @dev Propose an asset to add. The other spouse needs to approve this action.
   * @param _data The asset represented as a string.
   * @param _spouse1Allocation Allocation of spouse1.
   * @param _spouse2Allocation Allocation of spouse2.
   */
  function proposeAsset(string calldata _data, uint _spouse1Allocation, uint _spouse2Allocation) external onlySpouse isSigned isNotDivorced {
    require(isNotSameString(_data, ""), "No asset data provided!");
    require(_spouse1Allocation >= 0, "spouse1 allocation invalid!");
    require(_spouse2Allocation >= 0, "spouse2 allocation invalid!");
    require((_spouse1Allocation + _spouse2Allocation) == 100, "Total allocation must be equal to 100%!");

    // Add new asset
    Asset memory newAsset = Asset({
      data: _data,
      spouse1Allocation: _spouse1Allocation,
      spouse2Allocation: _spouse2Allocation,
      added: false,
      removed: false
    });
    uint newAssetId = assets.push(newAsset);

    emit AssetProposed(now, _data, msg.sender);

    // Map to a storage object (otherwise mappings could not be accessed)
    Asset storage asset = assets[newAssetId - 1];

    // Instantly approve it by the sender
    asset.hasApprovedAdd[msg.sender] = true;

    emit AssetAddApproved(now, _data, msg.sender);
  }

  /**
   * @dev Approve the addition of a prior proposed asset. The other spouse needs to approve this action.
   * @param _assetId The id of the asset that should be approved.
   */
  function approveAsset(uint _assetId) external onlySpouse isSigned isNotDivorced {
    require(_assetId > 0 && _assetId <= assets.length, "Invalid asset id!");

    Asset storage asset = assets[_assetId - 1];

    require(asset.added == false, "Asset has already been added!");
    require(asset.removed == false, "Asset has already been removed!");
    require(asset.hasApprovedAdd[msg.sender] == false, "Asset has already approved by sender!");

    // Sender approved
    asset.hasApprovedAdd[msg.sender] = true;

    emit AssetAddApproved(now, asset.data, msg.sender);

    // Check if both spouses have approved
    if (asset.hasApprovedAdd[spouse1Address] && asset.hasApprovedAdd[spouse2Address]) {
      asset.added = true;
      emit AssetAdded(now, asset.data);
    }
  }

  /**
   * @dev Approve the removal of a prior proposed/already added asset. The other spouse needs to approve this action.
   * @param _assetId The id of the asset that should be removed.
   */
  function removeAsset(uint _assetId) external onlySpouse isSigned isNotDivorced {
    require(_assetId > 0 && _assetId <= assets.length, "Invalid asset id!");

    Asset storage asset = assets[_assetId - 1];

    require(asset.added, "Asset has not been added yet!");
    require(asset.removed == false, "Asset has already been removed!");
    require(asset.hasApprovedRemove[msg.sender] == false, "Removing the asset has already been approved by the sender!");

    // Approve removal by the sender
    asset.hasApprovedRemove[msg.sender] = true;

    emit AssetRemoveApproved(now, asset.data, msg.sender);

    // Check if both spouses have approved the removal of the asset
    if (asset.hasApprovedRemove[spouse1Address] && asset.hasApprovedRemove[spouse2Address]) {
      asset.removed = true;
      emit AssetRemoved(now, asset.data);
    }
  }

  /**
   * @dev Request to divorce. The other spouse needs to approve this action.
   */
  function divorce() external onlySpouse isSigned isNotDivorced {
    require(hasDivorced[msg.sender] == false, "Sender has already approved to divorce!");

    // Sender approved
    hasDivorced[msg.sender] = true;

    emit DivorceApproved(now, msg.sender);

    // Check if both spouses have approved to divorce
    if (hasDivorced[spouse1Address] && hasDivorced[spouse2Address]) {
      divorced = true;
      emit Divorced(now);

      // Get the contracts balance
      uint balance = address(this).balance;

      // Split the remaining balance half-half
      if (balance != 0) {
        // Ignore any remainder due to low value
        uint balancePerSpouse = balance / 2;

        // Send transfer to spouse1
        spouse1Address.transfer(balancePerSpouse);
        emit FundsSent(now, spouse1Address, balancePerSpouse);

        // Send transfer to spouse2
        spouse2Address.transfer(balancePerSpouse);
        emit FundsSent(now, spouse2Address, balancePerSpouse);
      }
    }
  }

  /**
   * @dev Return whether asset has been approved by sender.
   */
  function assetIsApproved(uint _assetId) external onlySpouse view returns (bool) {
    require(_assetId > 0 && _assetId <= assets.length, "Invalid asset id!");
    Asset storage asset = assets[_assetId - 1];
    return asset.hasApprovedAdd[msg.sender];
  }

  /**
   * @dev Return whether asset has been removed by sender.
   */
  function assetIsRemoved(uint _assetId) external onlySpouse view returns (bool) {
    require(_assetId > 0 && _assetId <= assets.length, "Invalid asset id!");
    Asset storage asset = assets[_assetId - 1];
    return asset.hasApprovedRemove[msg.sender];
  }

  /**
   * @dev Return a list of all asset ids.
   */
  function getAssetIds() external view returns (uint[] memory) {
    uint assetCount = assets.length;
    uint[] memory assetIds = new uint[](assetCount);

    // Get all asset ids
    for (uint i = 1; i <= assetCount; i++) { assetIds[i - 1] = i; }

    return assetIds;
  }
}
