import React from "react"
import { css } from "@emotion/core"
import { Heading } from "@chakra-ui/core"

const Layout: React.FC = ({ children }) => {
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                padding: 0 3.2rem;

                header {
                    padding: 1.6rem 0;
                }
            `}
        >
            <header>
                <Heading size="xl">Frskd</Heading>
            </header>
            <main
                css={css`
                    display: flex;
                    justify-content: space-between;
                `}
            >
                {children}
            </main>
        </div>
    )
}

export default Layout
