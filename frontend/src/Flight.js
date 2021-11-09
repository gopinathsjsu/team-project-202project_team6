import React from 'react'

function Flight() {
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) =>
                        <p>🌟</p>
                    )}

                </div>
            </div>
            <img
                src="https://icons.iconarchive.com/icons/martz90/circle-addon2/512/plane-flight-icon.png"
                alt=""
            />
            <button onClick={addToBasket}>Add to Iternary</button>
        </div>
    )
}

export default Flight
