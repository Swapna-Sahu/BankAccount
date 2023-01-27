import React from 'react'

const IPaymentsPage = () => {

  return (
    <>
    <div className="ipayblock">
    <h3>From Account</h3>
    <div>
      <label>IBAN No.</label>
      <input type="text" placeholder='DK5000400024442323'/>
      <label>Currency</label>
      <input type="text" placeholder='DKK'/>
    </div>
  
    <div>
      <label>BIC Code</label>
      <input type="text" placeholder=''/>
    </div>
    <div>
      <label>Swift Code</label>
      <input type="text" placeholder='AAAA-BB-CC-123'/>
    </div>
    </div>

    <div className="ipayblock">
    <h3>To Account</h3>
    <div>
      <label>IBAN No.</label>
      <input type="text" placeholder='DK5000400024442323'/>
    </div>
    <div>
      <label>BIC Code</label>
      <input type="text" placeholder=''/>
    </div>
    </div>

    <div className="ipayblock">
      <label>Amount : </label>
      <input type="text" placeholder='850'/>
      <label>Currency : </label>
      <input type="text" placeholder='DKK'/>
    </div>

     <div><button>Submit</button></div>
    </>
  )
}

export default IPaymentsPage