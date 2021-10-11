import React from 'react'

import { ThemeProvider } from './app/components/themeContext'
import AppWrapper from './app/AppWrapper'

const App = () => {
    return (
        <ThemeProvider>
            <AppWrapper />
        </ThemeProvider>
    )
}

export default App