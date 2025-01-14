import type { AxiosInstance } from "axios";
import { createStore } from "zustand/vanilla";

export type SpelyState = {
	axios: AxiosInstance | null;
};

export type SpelyActions = {
	setAxios: (axios: AxiosInstance) => void;
};

export type SpelyStore = SpelyState & SpelyActions;

export const defaultInitState: SpelyState = {
	axios: null,
};

export const createSpelyStore = (initState: SpelyState = defaultInitState) => {
	return createStore<SpelyStore>()((set) => ({
		...initState,
		setAxios: (axios: AxiosInstance) => set({ axios }),
	}));
};
