import { useTranslation } from "react-i18next";

export const useI18n = () => {
	const { t: translate } = useTranslation();

	const t = (path: string, bindings?: Record<string, any>) =>
		translate(path, bindings);

	const scopedT =
		(scope: string) => (path: string, bindings?: Record<string, any>) =>
			t(`${scope}.${path}`, bindings);

	return { t, scopedT };
};
