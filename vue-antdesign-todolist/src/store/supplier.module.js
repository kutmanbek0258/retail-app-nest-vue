import SupplierService from '../services/supplier.service';
import router from '../router';

const state = {
    supplier: null,
    suppliers: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
    dialogVisibleSuppler: false,
    selectedSupplier: {
        id: null,
        name: '',
    }
};

const actions = {
    createSupplier({dispatch, commit}, {personID, companyID}){
        SupplierService.createSupplier({personID, companyID}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.push('/references/supplier');
                dispatch('alert/success', 'Supplier created success!', {root: true});
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllSuppliers({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        SupplierService.getAllSuppliers({take, skip}).then(
            suppliers => {
                commit('setSuppliers', suppliers.data);
                commit('setCurrent', current);
                commit('setPageSize', pageSize);
            }
        ).catch(error => {
            const suppliers = {
                suppliers: null,
                total: 0,
            }
            commit('setSuppliers', suppliers);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getSupplierById({dispatch, commit}, {id}){
        SupplierService.getSupplierById({id}).then(
            supplier => {
                commit('setSupplier', supplier.data[0]);
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateSupplier({dispatch, commit}, {id, personID, companyID}){
        SupplierService.updateSupplier({id, personID, companyID}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.push('/references/supplier');
                dispatch('alert/success', 'Supplier updated success!', {root: true});
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteSupplier({dispatch, commit}, {id}){
        SupplierService.deleteSupplier({id}).then(
            supplier => {
                commit('setSupplier', supplier.data);
                router.go(0);
                dispatch('alert/success', 'Supplier deleted success!', {root: true});
            }
        ).catch(error => {
            commit('setSupplier', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    setDialogVisibilitySupplier({dispatch, commit}, {visibility}){
        commit('setDialogVisibleSuppler', visibility);
    },

    handleSelectSupplier({dispatch, commit}, {id, name}){
        const selectedSupplier = { id, name };
        const dialogVisibility = false;
        commit('setSelectedSupplier', selectedSupplier);
        commit('setDialogVisibleSuppler', dialogVisibility);
    },

    handleCloseSelectionSupplier({dispatch, commit}){
        const selectedShop = { id: null, name: '' };
        commit('setSelectedSupplier', selectedShop);
    }
};

const mutations = {
    setSupplier(state, supplier){
        state.supplier = supplier;
    },

    setSuppliers(state, suppliers){
        state.suppliers = suppliers.suppliers;
        state.totalCount = suppliers.total;
    },

    setCurrent(state, current){
        state.current = current;
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize;
    },

    setDialogVisibleSuppler(state, visibility){
        state.dialogVisibleSuppler = visibility;
    },

    setSelectedSupplier(state, selectedSupplier){
        state.selectedSupplier = selectedSupplier;
    }
};

export const supplierModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}