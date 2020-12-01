import { useEffect, useCallback, useRef } from "react";

export const useTimeout = (
	callback: () => void,
	timeoutMillis: number = 0
): (() => void) => {
	const timeoutIdRef = useRef<NodeJS.Timeout>();

	const cancelTimeout = useCallback(() => {
		const timeoutId = timeoutIdRef.current;
		if (timeoutId) {
			timeoutIdRef.current = undefined;
			clearTimeout(timeoutId);
		}
	}, [timeoutIdRef]);

	useEffect(() => {
		timeoutIdRef.current = setTimeout(callback, timeoutMillis);
		return cancelTimeout;
	}, [callback, timeoutMillis, cancelTimeout]);

	return cancelTimeout;
};
