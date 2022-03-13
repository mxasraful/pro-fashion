import { createContext, useContext, useEffect, useState } from "react"

// Menage cart context
const CartContext = createContext()
export const CartContextProvider = (props) => {
    const cart = CartDt()
    return <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

const CartDt = () => {

    const [cartItems, setCartItems] = useState([])
    const [cartLoader, setCartLoader] = useState(true)
    const [subtotalMoney, setSubtotalMoney] = useState(0)
    const [shipMoney, setShipMoney] = useState(0)
    const [taxMoney, setTaxMoney] = useState(0)
    const [totalMoney, setTotalMoney] = useState(0)

    const setItem = (data) => {
        setCartLoader(true)
        if (cartItems?.length) {
            const validation = cartItems.find(dt => dt.id === data.id)
            if (validation) {
                if (data.size === validation.size) {
                    const cartData = cartItems.filter(dt => dt.id !== data.id)
                    localStorage.setItem("pf-cart", JSON.stringify([data, ...cartData]))
                } else {
                    localStorage.setItem("pf-cart", JSON.stringify([...cartItems, data]))                    
                }
                console.log(data)
            } else {
                localStorage.setItem("pf-cart", JSON.stringify([...cartItems, data]))
            }
        } else {
            localStorage.setItem("pf-cart", JSON.stringify([data]))
        }
        setCartLoader(false)
        getCartItems()
    }

    const updateQty = (data) => {
        setCartLoader(true)
        const cartData = cartItems.filter(dt => dt.id !== data.id)
        localStorage.setItem("pf-cart", JSON.stringify([data, ...cartData]))
        setCartLoader(false)
        getCartItems()
    }

    const deleteItem = (data) => {
        setCartLoader(true)
        const cartData = cartItems?.filter(dt => data !== dt.id)
        localStorage.setItem("pf-cart", JSON.stringify(cartData))
        setCartLoader(false)
        getCartItems()
    }

    const getCartItems = () => {
        setCartLoader(true)
        const cartData = JSON.parse(localStorage.getItem("pf-cart"))
        if (cartData?.length) {
            const sortedDt = cartData.sort((a, b) => {
                return a.num - b.num
            })
            setCartItems(sortedDt)
        } else {
            setCartItems([])
        }
        setCartLoader(false)
        calculateMoney()
    }

    useEffect(() => {
        getCartItems()
    }, [])

    useEffect(() => {
        calculateMoney()
    }, [cartItems, subtotalMoney, shipMoney, taxMoney, totalMoney])

    const calculateMoney = () => {
        const subtotal = cartItems.reduce((orderTotal, item) => orderTotal + item.price * item.qty, 0)
        const totalQty = (cartItems.reduce((orderTotal, item) => orderTotal + item.qty, 0)) * 2
        const tax = ((subtotal + (totalQty * 2)) / 100) * 2
        setSubtotalMoney(subtotal)
        setShipMoney(totalQty)
        setTaxMoney(tax)
        setTotalMoney(subtotal + totalQty + tax)
    }


    return {
        cartItems,
        cartLoader,
        subtotalMoney,
        shipMoney,
        taxMoney,
        totalMoney,
        setItem,
        updateQty,
        deleteItem
    }
}
