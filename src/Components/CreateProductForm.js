import React from 'react'

const CreateProductForm = () => {
  return (
    <div>
      <h1>Create product.</h1>
      <form>
        <input placeholder='name...'/>
        <input placeholder='description...'/>
        <input placeholder='collectionId...'/>
        <input placeholder='price...'/>
        <input placeholder='imageURL...'/>
        <input placeholder='Piece count...'/>
        <input placeholder='Starting quantity'/>
      </form>
    </div>
  )
}

export default CreateProductForm;