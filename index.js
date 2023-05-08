import { accounts } from './data.js'

const accountsElement = document.getElementById('accounts-element')
const spendingsElement = document.getElementById('spendings-element')

document.getElementById('nav-menu').addEventListener('click', renderNavMenu)

function renderNavMenu() {
    document.getElementById('nav-bar-small').classList.toggle('hidden')
}

function getAccountsHtml() {
    let accountsHtml = ``
    for (let account of accounts){
        accountsHtml += `
            <div class="account" data-account="${account.id}" id="${account.id}">
                <h3 class="account-title" data-account="${account.id}">${account.title}</h3>
                <h3 class="account-balance" data-account="${account.id}">$ ${account.balance}</h3>
            </div>
        `
    }
    return accountsHtml
}

function renderAccounts() {
    accountsElement.innerHTML = getAccountsHtml()
}

renderAccounts()


document.addEventListener('click', e => {
    if (e.target.dataset.account){
        highlightTargetAccount(e.target.dataset.account)
        getSpendingsHtml(e.target.dataset.account)
    }
})


function highlightTargetAccount(accountId) {
    const account = document.getElementsByClassName('account')
    for (let singleAccount of account){
        singleAccount.classList.remove('highlight')
    }
    document.getElementById(accountId).classList.add('highlight')
}


function getSpendingsHtml(accountId) {
    const spendingsArray = accounts.filter( account => account.id == accountId)[0].spendings

    let spendingsHtml = ``
    let spendingsIndex = 0
    for (let spending of spendingsArray){
        spendingsIndex++
        let percent = 100 - spendingsIndex*10
        spendingsHtml += `
            <div class="spending" style="width: ${percent}%">
                <h4 class="spending-category">${spending.category}</h4>
                <h4 class="spending-amount">$ ${spending.spent}</h4>
            </div>
        `
    } 
    spendingsElement.innerHTML = spendingsHtml
}