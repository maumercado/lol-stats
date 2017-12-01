import { SEARCH } from "../actions/types";
export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH: {
            let { matches, summoner, submitted, loading } = action.payload;

            return {
                ...state,
                summoner,
                matches,
                submitted,
                loading
            };
        }
        default: {
            return state;
        }
    }
};
