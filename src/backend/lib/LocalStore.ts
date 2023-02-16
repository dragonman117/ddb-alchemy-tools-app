import {IState} from "../models/state";
import ElectronStore, {Schema} from "electron-store";

const schema: Schema<IState> = {
    cobaltToken: {
        type: 'string',
    },
    jwtToken: {
        type: 'string',
    },
    jwtDateTime: {
        type: "string",
        format: "date"
    }
}

export const StoreKeys = {
    cobaltToken : "cobaltToken",
    jwtToken: "jwtToken",
    jwtDateTime: "jwtDateTime"
}

const store = new ElectronStore<IState>({schema});
export default store;
