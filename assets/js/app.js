function changeTheme() {
    if (document.body.style.backgroundColor == 'rgb(30, 35, 55)') {
        document.body.style.backgroundColor = 'rgb(247,249,251)'
        document.getElementById('themeIcon').className = 'far fa-moon'
        document.getElementById('themeIcon').style.color = 'rgb(0, 0, 0)'
        document.getElementById('tonLogo').src = '/assets/img/ton_logo_light_background.svg'
        document.getElementById('mainBannerText').style.color = 'rgb(0, 0, 0)'
        document.getElementById('statsBanner').style.color = 'rgb(0, 0, 0)'
    }
    else {
        document.body.style.backgroundColor = 'rgb(30,35,55)'
        document.getElementById('themeIcon').className = 'far fa-sun'
        document.getElementById('themeIcon').style.color = 'rgb(255, 255, 255)'
        document.getElementById('tonLogo').src = '/assets/img/ton_logo_dark_background.svg'
        document.getElementById('mainBannerText').style.color = 'rgb(255, 255, 255)'
        document.getElementById('statsBanner').style.color = 'rgb(255, 255, 255)'
    }
}

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://shp3x.github.io/tonconnect-manifest.json',
    buttonRootId: 'ton-connect',
});

function enableExchangeButton() {
    document.getElementById('joinButton').disabled = false;
}

async function showModalWindow() {
    $('#myModal').modal('show');
}

async function changeAmount() {
    amount = document.getElementById('amountValue').value
    document.getElementById('receiveValue').value = parseFloat(amount * 6.6).toFixed(2);
}

async function createTransaction() {
    const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
        {
            address: "UQDjF5iuLIovsxqY7L0KPAek7OdZn3m6mZJhHlJOiP2qTo8O",
            amount: $('#amountValue').val() * 1000000000
        }
    ]
    }
    try {
    const result = await tonConnectUI.sendTransaction(transaction,{
    // modals: ['before', 'success', 'error'],
    notifications: ['before', 'success', 'error']
});
    const someTxData = await myAppExplorerService.getTransaction(result.boc);
    alert('Transaction was sent successfully', someTxData);
} catch (e) {
        console.error(e); 
    }
}
