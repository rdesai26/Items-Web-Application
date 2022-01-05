export const getItems = state => state.items.data;
export const getItemsLoading = state => state.items.isLoading;

export const getUser = state => state.users.data;
export const getToken = state => state.users.token;
export const getLoggedIn = state => state.users.isLoggedIn;
export const getLoginAttempt = state => state.users.loginAttempt;