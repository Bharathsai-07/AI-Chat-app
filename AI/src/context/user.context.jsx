import { createContext, useContext, useMemo, useState } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = (userData) => {
		setUser(userData)
		setIsAuthenticated(true)
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
	}

	const value = useMemo(
		() => ({
			user,
			setUser,
			isAuthenticated,
			setIsAuthenticated,
			login,
			logout,
		}),
		[user, isAuthenticated],
	)

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// export const useUser = () => {
// 	const context = useContext(UserContext)

// 	if (!context) {
// 		throw new Error('useUser must be used within a UserProvider')
// 	}

// 	return context
// }
