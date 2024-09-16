// Initialize Web3
let web3;
let contract;
let accounts;

// Contract ABI and address (replace with your own)
const contractABI = [
  // Paste your contract's ABI here
];
const contractAddress = "0xYourContractAddress";

// Connect to MetaMask
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            contract = new web3.eth.Contract(contractABI, contractAddress);
            alert("Wallet connected: " + accounts[0]);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Give consent
async function giveConsent() {
    try {
        await contract.methods.giveConsent().send({ from: accounts[0] });
        alert("Consent given!");
    } catch (error) {
        console.error("Error giving consent:", error);
    }
}

// Submit mood score
async function submitMoodScore() {
    const moodScore = document.getElementById("moodScore").value;
    if (moodScore < 0 || moodScore > 100) {
        alert("Please enter a valid mood score between 0 and 100.");
        return;
    }

    try {
        await contract.methods.submitMoodScore(moodScore).send({ from: accounts[0] });
        alert("Mood score submitted!");
    } catch (error) {
        console.error("Error submitting mood score:", error);
    }
}

// Revoke consent
async function revokeConsent() {
    try {
        await contract.methods.revokeConsent().send({ from: accounts[0] });
        alert("Consent revoked!");
    } catch (error) {
        console.error("Error revoking consent:", error);
    }
}

// Event listeners for buttons
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("giveConsent").addEventListener("click", giveConsent);
document.getElementById("submitMoodScore").addEventListener("click", submitMoodScore);
document.getElementById("revokeConsent").addEventListener("click", revokeConsent);
