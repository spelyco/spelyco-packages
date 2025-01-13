import type { AxiosInstance } from "axios";
import { createStore } from "zustand/vanilla";

export type SpelyCOReactState = {
	axios: AxiosInstance | null;
};

export type SpelyCOReactActions = {
	setAxios: (axios: AxiosInstance) => void;
};

export type SpelyCOReactStore = SpelyCOReactState & SpelyCOReactActions;

export const defaultInitState: SpelyCOReactState = {
	axios: null,
};

export const createSpelyCOReactStore = (
	initState: SpelyCOReactState = defaultInitState,
) => {
	return createStore<SpelyCOReactStore>()((set) => ({
		...initState,
		setAxios: (axios: AxiosInstance) => set({ axios }),
	}));
};
