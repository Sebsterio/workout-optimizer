export const getUser = (state) => state.user;

export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export const getIsIncognito = (state) => state.user.isIncognito;

export const getIsLoading = (state) => state.user.isLoading;
