import "@testing-library/jest-dom/extend-expect"

const mockedUseRouterReturnValue = {
  query: {},
  pathname: "/",
  asPath: "/",
  events: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => mockedUseRouterReturnValue,
}))
