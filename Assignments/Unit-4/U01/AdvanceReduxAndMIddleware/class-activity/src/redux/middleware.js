import logger from "redux-logger";
const delayMiddleware = (store) => (next) => (action) => {
  if (action.type === "INCREMENT_ASYNC") {
    setTimeout(() => {
      store.dispatch({ type: "INCREMENT" });
    }, 2000);
  } else {
    next(action);
  }
};

export { logger, delayMiddleware };
