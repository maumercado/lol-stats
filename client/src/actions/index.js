import axios from "axios";
import { SEARCH, SEARCH_ERROR } from "./types";
export const search = ({ search }) => async dispatch => {
    try {
        const res = await axios.get(`/v1/api/summoners`, {
            params: { search }
        });
        dispatch({ type: SEARCH, payload: { loading: true } });
        if (res.data) {
            let { accountId } = res.data.summoner;

            const stats = await axios.get(
                `/v1/api/summoners/${accountId}/matches/latest`
            );

            dispatch({
                type: SEARCH,
                payload: {
                    ...stats.data,
                    ...res.data,
                    submitted: true,
                    loading: false
                }
            });
        }
        if (!res.data) {
            dispatch({
                type: SEARCH,
                payload: {
                    submitted: true,
                    loading: false
                }
            });
        }
    } catch (error) {
        dispatch({ type: SEARCH_ERROR, payload: error, loading: false });
    }
};
