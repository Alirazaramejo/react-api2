import React, { useState } from 'react'
import { MainContext } from './MainContext'


function MainContextProvider({ children }) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <MainContext.Provider
                value={{
                    count,
                    setCount
                }}
            >
                {children}
            </MainContext.Provider>
        </div>
    )
}

export default MainContextProvider