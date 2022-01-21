import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './WalletCardEthers.css'

const WalletCardEthers = ({setUser}) => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [provider, setProvider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
				setUser(null)
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

useEffect(() => {
	connectWalletHandler();
	if(defaultAccount){
		provider.getBalance(defaultAccount)
		.then(balanceResult => {
			setUserBalance(ethers.utils.formatEther(balanceResult));
			setUser({account: defaultAccount, balance: ethers.utils.formatEther(balanceResult)})
		})
	};
}, [defaultAccount]);
	
	return !errorMessage ? (
		<div className='walletCard'>
			<h3>NFT-Foot</h3>
			<div className='walletCard-owner'>{defaultAccount}</div>
			<div className='walletCard-balance'>
				<p>{parseFloat(userBalance).toFixed(4)}</p>
				<img src="images/eth.png" />
			</div>
		</div>
	) : (
		{errorMessage}
	)
}

export default WalletCardEthers;