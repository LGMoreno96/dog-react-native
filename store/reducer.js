const INITIAL_STATES = {
  name: "",
  email: "",
  favorites: [],
};

export default function (state = INITIAL_STATES, { type, payload }) {
  switch (type) {
    case "SAVE_NAME":
      return { ...state, name: payload };

    case "SAVE_EMAIL":
      return { ...state, email: payload };

    case "SAVE_FAVORITE":
      return { ...state, favorites: payload };

    default:
      return state;
  }
}
