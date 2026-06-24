"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const money = process.env.NEXT_PUBLIC_MONEY;
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [logInForm, setLogInForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminForm, setAdminForm] = useState(false);
    const [user, setUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [userOrders, setUserOrders] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch("/api/user/product");
            const data = await res.json();
            setProducts(data.products);
        } catch (err) { };
    };

    const isUserLoggedIn = async () => {
        try {
            const res = await fetch("/api/user/isLoggedIn");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                if (data.user === null) return;
                setCartItems(data.user.cartItems);
            }
        } catch (err) { }
    };

    const checkIsAdmin = async () => {
        try {
            const res = await fetch("/api/admin/isAdmin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });
            if (res.ok) {
                const { admin } = await res.json();
                setIsAdmin(admin);
            } else {
                setIsAdmin(false);
            };
        } catch (err) { }
    };

    const getAdminOrders = async () => {
        try {
            if (adminOrders.length !== 0) return;
            const getAdminOrders = async () => {
                try {
                    const res = await fetch("/api/admin/orders");
                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.message || "Error")
                    };
                    return res.json()
                } catch (err) {
                    toast.error(err.message);
                };
            };

            toast.promise(getAdminOrders(), {
                loading: "Getting Orders...",
                success: (res) => {
                    setAdminOrders(res.orders);
                    return "Got it";
                },
                error: (err) => err.message
            });
        } catch (err) {
            toast.error(err.message);
        };
    };

    const updateCartItemsForUser = async () => {
        try {
            await fetch("/api/user/updateCartItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user._id, cartItems })
            });
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getProducts();
        isUserLoggedIn();
        checkIsAdmin();
    }, []);

    useEffect(() => {
        if (user) {
            updateCartItemsForUser();
        }
    }, [cartItems])

    const addItem = (id) => {
        const cartArray = structuredClone(cartItems);
        if (cartArray[id]) {
            cartArray[id] += 1;
        } else {
            cartArray[id] = 1
        };
        setCartItems(cartArray);
        toast.success("Item Added");
    };

    const removeItem = (id) => {
        const cartArray = structuredClone(cartItems);
        if (cartArray[id]) {
            cartArray[id] -= 1;
            if (cartArray[id] == 0) {
                delete cartArray[id];
            }
        }
        setCartItems(cartArray);
        toast.success("Item Removed");
    };

    const cutItem = (id) => {
        const cartArray = structuredClone(cartItems);
        delete cartArray[id];
        setCartItems(cartArray);
        toast.success("Items Removed");
    };

    const countCartItems = () => {
        const values = Object.values(cartItems);
        let count = values.reduce((acc, curr) => {
            return acc + curr
        }, 0);
        return count;
    };

    const value = { products, setProducts, money, cartItems, setCartItems, addItem, removeItem, countCartItems, cutItem, isAdmin, setIsAdmin, user, setUser, logInForm, setLogInForm, searchText, setSearchText, adminForm, setAdminForm, userOrders, setUserOrders, adminOrders, getAdminOrders };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
};

export const useAppContext = () => {
    return useContext(AppContext);
};