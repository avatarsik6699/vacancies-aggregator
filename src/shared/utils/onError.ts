export const onError = <E>(error: E) => {
	if (error instanceof Error) {
		console.log(error.stack);
	} else {
		console.log(error);
	}
};
