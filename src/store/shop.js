import {getShopsBypage,getShopAddress,getShopDelete,getPhoto,getAllSearch,getToken,storeAdd,updateAsync} from  '../service/shop'
import { async } from 'q';

export default {
    namespaced: true,
    state: {
        "start": 1,
        "count": 2,
        "total": 0,
        "totalPage": 0,
        "rows": []
    },
    mutations: {
        getShopList: (state, payload) => Object.assign(state, payload),
        setCurentPage: (state, payload) => state.start = payload - 0,
        setEeachPage: (state, payload) => {
            state.start = 1;
            state.count = payload - 0
        }
    },
    actions: {
        getShopsBypage: async ({ commit, state }, { name, value } = {}) => {
            name = name || ''
            value = value || ''
            let { data } = await getShopsBypage({ start: state.start, count: state.count, name, value });
            commit("getShopList", data);
        },
        queryLoading: async ({ commit, state }, queryString) => {

            let { data } = await getShopAddress(queryString);
            return data.map(item => {
                item.value = item.storeAddress;
                return item;
            })
        },
        getShopDelete: async ({ dispatch }, _id) => {
            await getShopDelete(_id);
            dispatch("getShopsBypage")
        },
        getPhoto: async (state, formData) => {
            return await getPhoto(formData)

        },
        getAllSearch: async ({ state }, { name, value }) => {
            let data = await getAllSearch({ start: 1, coutn: state.count, name, value });
            // console.log(data)
        },
        getToken: async ({ state }, payload) => {
            return await getToken()

        },
        storeAdd: async ({ dispatch }, payload) => {
            // console.log(payload)
            // let { storeTitle, storeNumber, sotreImg, storeAdress, storePosition, storeLegal, storePhone, storeFeature, storeEmployee, storeImgs, storeCommission_ratio, storeVip } = payload
            // let newData = { storeTitle, UserID, storeNumber, sotreImg, storeAdress, storePosition, storeLegal, storePhone, storeFeature, storeEmployee, storeImgs, storeCommission_ratio, storeVip, state }
            return storeAdd(payload)
        },
        updateAsync:async ({dispatch},payload)=>{
            return updateAsync(payload)
        }

    },


}