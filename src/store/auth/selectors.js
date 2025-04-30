export const selectLoading = (state) => state.authReducer.loading;

export const selectIsAuth = (state) => state.authReducer.isAuth;

export const selectUser = (state) => state.authReducer.user;

export const selectCheckingAuth = (state) => state.authReducer.checkingAuth;
