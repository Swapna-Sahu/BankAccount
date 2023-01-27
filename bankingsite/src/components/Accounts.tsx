import React from 'react'


interface IAccount {
  account: string,
  product: string,
  currency: string,
  balance: number
}
interface IPAccount {
  account: string,
  product: string,
  base: string,
  pocket: string[],
  bal: number[]
}

interface ILAccount {
  account: string,
  product: string,
  currency: string,
  balance: number
}

type TAccounts = IAccount[]
type PAccounts = IPAccount[]
type LAccounts = ILAccount[]

let currency = ["DKK","EUR","NOK","USD","SEK"] 

const accounts: TAccounts = [
  {
    account: "DK1231231213534", product: "Savings", currency: "DKK", balance : 10000
  },
  {
    account: "DK3423425453567", product: "Current", currency: "DKK", balance : 45000
  },
]

const pocket: PAccounts = [
  {
    account: "DK3627684654321", product: "Pocket", base: "DKK  6590",pocket:["DKK","EUR","DKK","USD","INR"] , bal : [2500,600,750]
  }
]

const loans: LAccounts = [
  {
    account: "DK1231231217654", product: "BTL", currency: "DKK", balance : -950000
  }
]

const Accounts = () => {

  return (
    <div>
      <h1>Accounts Overview</h1>


      <table className="m-table">
        <thead>
          <tr>
            <th>Accounts</th>
            <th>Product</th>
            <th>Currency</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
        {accounts.map((item) =>
          <tr>
            <td>{item.account}</td>
            <td>{item.product}</td>
            <td>{item.currency}</td>
            <td>{item.balance}</td>
          </tr>
        )}
        </tbody>
      </table>

        <table className="m-table">
        <thead>
          <tr>
            <th>Pocket Account</th>
            <th>Product</th>
            <th>Base CCY-Amount</th>
            <th>Pockets</th>
            <th>Pocket Balance</th>
          </tr>
        </thead>
        <tbody>
        {pocket.map((item) =>
          <tr>
            <td>{item.account}</td>
            <td>{item.product}</td>
            <td>{item.base}</td>
            <td>
              {
                Array.from( new Set( item.pocket ) ).map((curr)=>
              <tr>
                {currency.map((val)=> val===curr ? <td>{curr}</td> : null
                )}
              </tr>
              )}
            </td>
            <td>
              {item.bal.map((amt)=>
              <tr>
                <td>{amt}</td>
                </tr>
              )}
            </td>
          </tr>
        )}
        </tbody>
        </table>

        <table className="m-table">
        <thead>
          <tr>
            <th>Loans</th>
            <th>Product</th>
            <th>Currency</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
        {loans.map((item) =>
          <tr>
            <td>{item.account}</td>
            <td>{item.product}</td>
            <td>{item.currency}</td>
            <td>{item.balance}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Accounts