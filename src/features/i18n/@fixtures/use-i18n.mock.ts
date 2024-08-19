// @ts-ignore
import { useI18n } from "@/infrastructure/i18n/use-i18n";

jest.mock("@/infrastructure/i18n/use-i18n");

jest.mock("react-i18next", () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str: string) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
				// You can include here any property your component may use
			},
		};
	},
}));

export function mockUseI18n(props: Partial<ReturnType<typeof useI18n>> = {}) {
	const implementation: ReturnType<typeof useI18n> = {
		scopedT: jest.fn((x) => (y) => implementation.t(`${x}.${y}`)),
		t: jest.fn((x) => x),
	};

	jest.mocked(useI18n).mockReturnValue({
		...implementation,
		...props,
	});

	return { ...implementation, ...props };
}
