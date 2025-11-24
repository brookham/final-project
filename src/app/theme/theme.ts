import { createTheme } from '@mui/material/styles'


// if you want to use a google font
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});


// overwrite theme elements from MUI
export const theme = createTheme({
    // palette is a built-in MUI term, so we are overriding the object
    palette: {
        primary: {
            main: '#98DAAF',
        },
        secondary: {
            main: '#157145',
        },
        error: {
            main: '#ef476f',
        },
        warning: {
            main: '#ffd166',
        },
        info: {
            main: '#CFCFEA',
        },
        success: {
            main: '#118ab2',
        },
    },

    // set the font with the typography key
    typography: {
        fontFamily: openSans.style.fontFamily,
        button: {
            fontWeight: 700,
        },
    },


    // we can also do component specific styling
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingLeft: 20,
                    paddingRight: 20,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: 16,
                },
            },
        },
    },
})