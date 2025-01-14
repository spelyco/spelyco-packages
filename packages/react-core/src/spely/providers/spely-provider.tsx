"use client";

import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
} from "react";
import { useStore } from "zustand";

import type { AxiosInstance } from "axios";
import { type SpelyStore, createSpelyStore } from "../stores/spely-store";

export type SpelyStoreApi = ReturnType<typeof createSpelyStore>;

export const SpelyStoreContext = createContext<SpelyStoreApi | undefined>(
	undefined,
);

export type SpelyStoreConfigProps = {
	axios: AxiosInstance;
};

export interface SpelyStoreProviderProps extends PropsWithChildren {
	config: SpelyStoreConfigProps;
}

export const SpelyStoreProvider = ({
	children,
	config,
}: SpelyStoreProviderProps) => {
	const { axios } = config;
	const storeRef = useRef<SpelyStoreApi>(createSpelyStore());

	useEffect(() => {
		if (storeRef.current) {
			storeRef.current.setState(() => ({
				axios,
			}));
		}
	}, [axios]);

	return (
		<SpelyStoreContext.Provider value={storeRef.current}>
			{children}
		</SpelyStoreContext.Provider>
	);
};

export const useSpelyStore = <T,>(selector: (store: SpelyStore) => T): T => {
	const counterStoreContext = useContext(SpelyStoreContext);

	if (!counterStoreContext) {
		throw new Error("useSpelyStore must be used within SpelyStoreProvider");
	}

	return useStore(counterStoreContext, selector);
};
