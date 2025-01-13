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
import {
	type SpelyCOReactStore,
	createSpelyCOReactStore,
} from "../stores/spelyco-react-store";

export type SpelyCOReactStoreApi = ReturnType<typeof createSpelyCOReactStore>;

export const SpelyCOReactStoreContext = createContext<
	SpelyCOReactStoreApi | undefined
>(undefined);

export type SpelyCoReactStoreConfigProps = {
	axios: AxiosInstance;
};

export interface SpelyCOReactStoreProviderProps extends PropsWithChildren {
	config: SpelyCoReactStoreConfigProps;
}

export const SpelyCOReactStoreProvider = ({
	children,
	config,
}: SpelyCOReactStoreProviderProps) => {
	const { axios } = config;
	const storeRef = useRef<SpelyCOReactStoreApi>(createSpelyCOReactStore());

	useEffect(() => {
		if (storeRef.current) {
			storeRef.current.setState(() => ({
				axios,
			}));
		}
	}, [axios]);

	return (
		<SpelyCOReactStoreContext.Provider value={storeRef.current}>
			{children}
		</SpelyCOReactStoreContext.Provider>
	);
};

export const useSpelyCOReactStore = <T,>(
	selector: (store: SpelyCOReactStore) => T,
): T => {
	const counterStoreContext = useContext(SpelyCOReactStoreContext);

	if (!counterStoreContext) {
		throw new Error(
			"useSpelyCOReactStore must be used within SpelyCOReactStoreProvider",
		);
	}

	return useStore(counterStoreContext, selector);
};
