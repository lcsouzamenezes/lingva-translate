import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

// Jest JSDOM bug
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

const Providers: FC = ({ children }) => (
    <ChakraProvider theme={theme}>
        {children}
    </ChakraProvider>
);

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };