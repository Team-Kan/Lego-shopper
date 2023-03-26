import React from 'react'

const OrderHistory = (props) => {
    const {orderHistory} = props;
   
  return (
    <div>
      {orderHistory.length 
        ? ( 
          orderHistory.map(order => {
            return (
              <div key={order.id}>
                {order.id}
              </div>
            )
          }))
        : (
          <div className='bg-yellow-500 text-4xl'>
            You have no previous orders... yet!
          </div>
        )
      }
    </div>
  )
}

export default OrderHistory;
