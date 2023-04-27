import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import { MdLocalGasStation } from 'react-icons/md'


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}





const RazorPay = ({setPaymentModal, setModalOpen,handleOrderStatus, orderInfo}) => {
  
  console.log(orderInfo)
  const  {user}  = useContext(AuthContext)

  const [orderData, setOrderData] = useState({})

  const Razorkey = "rzp_test_IYzwCFriTotFoj"

  console.log(Razorkey)

  const [paymentId, setPaymentId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [signature, setSignature] = useState('')

  console.log(paymentId)
  console.log(orderId)
  console.log(signature)

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }
 
    // const data = await fetch('http://localhost:5000/api/payments/add', { method: 'POST' }).then((t) => t.json())
    const data = await fetch('https://ninja-lawyer-server.vercel.app/api/payments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.uid,
        lawyerID: orderInfo.lawyerUID,
        amount: orderInfo.budget
      })
    }).then((t) => t.json());
    setOrderData(data.response)
    console.log(data) 

    const totalAmount = orderData.amount*100

    console.log(totalAmount)

    const options = {
        key: Razorkey,
        currency: "INR",
        amount: totalAmount,
        order_id: data.response.id,
        name: orderInfo.case_name,
        description: "none",
        image: 'https://i.ibb.co/qBW666W/NINJA-ICON-ONLY-1.png',
        handler: function (response) {
          setPaymentId(response.razorpay_payment_id)
          setOrderId(response.razorpay_order_id)
          setSignature(response.razorpay_signature) 
        },
        prefill: {
            name: orderInfo.client_name, 
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}
 
  return (
    <div className='flex flex-col items-center justify-center h-fit'>
      {/* <p>12000</p> */}
      {/* <button onClick={()=>checkoutHandler(12000)}>Buy now</button> */}
      <div className="flex items-center justify-center">
        {!orderData.id &&
          <button className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-r-none border-r-none" onClick={()=>{
          displayRazorpay()
          handleOrderStatus("accepted")}}>Accept</button>}
          {!orderData.id &&
        <button onClick={()=>handleOrderStatus("rejected")} className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-l-none border-l-non" >Reject</button>}
      </div> 

        <div className="flex flex-col items-center justify-center">
          {orderData.id && <p className='text-success'>Your order has been placed</p>}
        {/* <p>{paymentId}</p>
        <p>{orderId}</p>
        <p>{signature}</p> */}
        </div>
    </div>
  )
}

export default RazorPay