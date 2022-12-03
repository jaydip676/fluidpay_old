//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.13;

import {IFakeDAI} from "./IFakeDAI.sol";

import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

// For deployment on Goerli Testnet
// host 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9
// fdaix 0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00

contract fluidPay {

    address[] public platforms; //address array for platform
    mapping (address=>bool) public isPlatformAdded; //mapping to check if there is already a platform on out platform

    ///@ struct to handle platform details
    struct Platform{
        string name;
        int96 perSecond;
    }

    ///@notice mapping for address to Platform struct
    mapping (address=>Platform) public addressToPlatform;

    ///@notice function to get platform price
    function getPlaformPrice(address _platformAddress) public view returns(int96){
        return addressToPlatform[_platformAddress].perSecond;
    }

    ///@notice Struct to handle User data
    struct User{
        uint amount_staked;
    }

    ///@notice mapping for address to User struct
    mapping (address=>User) public addressToUser;

    ///@notice Mapping to handle stream start time
    mapping (address=>mapping (address=>uint256)) public userToPlatformStartTime;
    ///@notice Mapping to handle stream end time
    mapping (address=>mapping (address=>uint256)) public userToPlatformEndTime;

    using CFAv1Library for CFAv1Library.InitData;   //using CFAv1Library
    CFAv1Library.InitData public cfaV1; //initialize cfaV1 variable
    ISuperToken public goerliDaiX;

    // Host address on Polygon = 0xEB796bdb90fFA0f28255275e16936D25d3418603
    // fDAIx address on Polygon = 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f
    ///@param _host address, and superToken address
    constructor(ISuperfluid _host, ISuperToken _goerliDaiX) {

        //initialize InitData struct, and set equal to cfaV1        
        cfaV1 = CFAv1Library.InitData(
            _host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(_host.getAgreementClass(
                        keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                    ))
            )
        );

        goerliDaiX = _goerliDaiX;

    }

    ///@param _platform address, _name name, platform price per second
    ///@notice Function to RegisterPlatform
    function registerPlatform(address _platform,string memory _name,int96 _persecond) public{
        if(!isPlatformAdded[_platform]){
            addressToPlatform[_platform] = Platform(_name,_persecond);
            platforms.push(_platform);
        }  
    }

    /// @dev Mints 10,000 fDAI to this contract and wraps it all into fDAIx
    // function gainDaiX() external {

    //     // Get address of fDAI by getting underlying token address from DAIx token
    //     IFakeDAI fdai = IFakeDAI( goerliDaiX.getUnderlyingToken() );
        
    //     // Mint 10,000 fDAI
    //     fdai.mint(address(this), 10000e18);

    //     // Approve fDAIx contract to spend fDAI
    //     fdai.approve(address(goerliDaiX), 20000e18);

    //     // Wrap the fDAI into fDAIx
    //     goerliDaiX.upgrade(10000e18);

    // }

    ///@notice function to stake and mint supertoken equivalent to what staked
    ///@param _user user' address, and amount to stake
    function stake(address _user, uint256 _amount) public payable {
        //msg.value should be equals to amount entered
        require(msg.value == _amount,"not proper amount");  
        payable(msg.sender).transfer(msg.value);
        //keeping track of user' stake using addressToUser
        addressToUser[_user].amount_staked = _amount;

         // Get address of fDAI by getting underlying token address from DAIx token
        IFakeDAI fdai = IFakeDAI( goerliDaiX.getUnderlyingToken() );
        
        // Mint 10,000 fDAI
        fdai.mint(address(this), 10000e18);

        // Approve fDAIx contract to spend fDAI
        fdai.approve(address(goerliDaiX), 20000e18);

        // Wrap the fDAI into fDAIx
        goerliDaiX.upgrade(10000e18);
    } 


    ///@dev creates a stream from this contract to desired receiver at desired rate
    ///@param _user user' address, and platform' address
    function createStream(address _user, address _platform) external {
        userToPlatformStartTime[_user][_platform]=block.timestamp;
        // Create stream
        cfaV1.createFlow(_platform, goerliDaiX, addressToPlatform[_platform].perSecond);

    }

    ///@notice Function to get stream start time 
    ///@param _user user' address, and platform address
    function streamstartTime(address _user, address _platform) public view returns(uint256){
        return userToPlatformStartTime[_user][_platform];
    }

    ///@notice Function to get stream end time 
    ///@param _user user' address, and platform address
    function streamEndTime(address _user, address _platform) public view returns(uint256){
        return userToPlatformEndTime[_user][_platform];
    }

    ///@notice Function to get stream duration
    ///@param _user user' address, and platform address
    function timeBeenStreamed(address _user, address _platform) public view returns(uint256){
        uint startTime = userToPlatformStartTime[_user][_platform];
        uint endTime = userToPlatformEndTime[_user][_platform];
        return (endTime - startTime);
    }
    

    /// @dev deletes a stream from this contract to desired receiver
    /// @param _user user' address and _platform platform' address
    function deleteStream(address _user,address _platform) external {
        // Delete stream
        cfaV1.deleteFlow(address(this), _platform, goerliDaiX);
        userToPlatformEndTime[_user][_platform]=block.timestamp;
        uint time = userToPlatformEndTime[_user][_platform] - userToPlatformStartTime[_user][_platform];
        uint256 payed = (time * 1) / 10000;
        addressToUser[_user].amount_staked -= payed;
    }

    /// @notice Function to withdraw funds
    /// @param _user user' address
     function withdraw(address _user) public payable {
        uint256 amount = addressToUser[_user].amount_staked;
        payable(address(this)).transfer(amount);
        addressToUser[_user].amount_staked = 0;
    }
}