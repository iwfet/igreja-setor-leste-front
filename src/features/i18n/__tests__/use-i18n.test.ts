import { renderHook } from "@testing-library/react";

import { useI18n } from "../use-i18n.ts";

const tFromReacti18Next = jest.fn();

jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: tFromReacti18Next,
	}),
}));

const makeSut = () => renderHook(() => useI18n());

describe("useI18n", () => {
	it("should call t function from react-i18next", () => {
		const { result } = makeSut();
		result.current.t("path.to.translate");

		expect(tFromReacti18Next).toHaveBeenCalled();
		expect(tFromReacti18Next).toHaveBeenCalledWith(
			"path.to.translate",
			undefined,
		);
	});

	it("should call t function with bindings", () => {
		const { result } = makeSut();
		result.current.t("path.to.translate", { foo: "bar" });

		expect(tFromReacti18Next).toHaveBeenCalled();
		expect(tFromReacti18Next).toHaveBeenCalledWith("path.to.translate", {
			foo: "bar",
		});
	});

	it("should call t function when scopedT is called", () => {
		const { result } = makeSut();
		result.current.scopedT("scope")("to.translate");

		expect(tFromReacti18Next).toHaveBeenCalled();
		expect(tFromReacti18Next).toHaveBeenCalledWith(
			"scope.to.translate",
			undefined,
		);
	});
});
