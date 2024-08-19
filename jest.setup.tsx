// @ts-ignore
import { TextDecoder, TextEncoder } from "node:util";

// @ts-ignore
Object.assign(global, { TextDecoder, TextEncoder });

jest.mock("@tanstack/react-router", () => ({
	...jest.requireActual("@tanstack/react-router"),
	Link: ({ children, ...props }: { children: React.ReactNode; to: string }) => (
		<a {...props}>{children}</a>
	),
}));
