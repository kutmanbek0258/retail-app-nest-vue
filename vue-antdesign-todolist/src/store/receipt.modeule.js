import ReceiptService from '../services/receipt.service'
import router from "@/router";

const state = {
    receipt: null,
    receipts: null,
    receiptItem: null,
    receiptItems: null,
    current: 1,
    pageSize: 10,
    totalCount: 0,
    dialogVisibleReceipt: false,
    selectedReceipt: {
        id: null,
        name: '',
    },
    editedItem: {},
    editedData: []
}

const actions = {
    createReceipt({dispatch, commit}, {supplierID, shopID, depotID}){
        ReceiptService.createReceipt({supplierID, shopID, depotID}).then(
            receipt => {
                commit('setReceipt', receipt.data);
                router.push('/depot/receipts');
                dispatch('alert/success', 'Receipt created success!', { root: true});
            }
        ).catch(error => {
            commit('setReceipt', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getAllReceipts({dispatch, commit}, {current, pageSize}){
        const take = pageSize;
        const skip = (current === 0) ? 0 : pageSize * (current - 1);
        ReceiptService.getAllReceipts({take, skip}).then(
            receipts => {
                console.log(receipts.data.receipts);
                commit('setReceipts', receipts.data);
                commit('setPageSize', pageSize);
                commit('setCurrent', current);
            }
        ).catch(error => {
            commit('setReceipts', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    getReceiptById({dispatch, commit}, {id}){
        ReceiptService.getReceiptById({id}).then(
            receipt => {
                commit('setReceipt', receipt.data[0]);
            }
        ).catch(error => {
            commit('setReceipt', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    updateReceipt({dispatch, commit}, {id, supplierID, shopID, depotID}){
        ReceiptService.updateReceipt({id, supplierID, shopID, depotID}).then(
            receipt => {
                commit('setReceipt', receipt.data);
                router.push('/depot/receipts');
                dispatch('alert/success', 'Updated success!', {root: true});
            }
        ).catch(error => {
            commit('setReceipt', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    deleteReceipt({dispatch, commit}, {id}){
        ReceiptService.deleteReceipt({id}).then(
            receipt => {
                commit('setReceipt', receipt.data);
                router.go(0);
            }
        ).catch(error => {
            commit('setReceipt', null);
            dispatch('alert/error', error.response.data.message, {root: true});
        })
    },

    addReceiptItem({dispatch, commit}, {receiptID, productID, quantity, price}){
        ReceiptService.addReceiptItem({receiptID, productID, quantity, price}).then(
            receiptItem => {
                commit('setReceiptItem', receiptItem.data);
                dispatch('getAllReceiptItem', receiptID);
            }
        ).catch(error => {
            commit('setReceiptItem', null);
            dispatch('alert/error', error.response.data.message, {root: true})
        })
    },

    getAllReceiptItem({dispatch, commit}, {receiptID}){
        ReceiptService.getAllReceiptItems({receiptID}).then(
            receiptItems => {
                commit('setReceiptItems', receiptItems.data);
            }
        ).catch(error => {
            commit('setReceiptItems', null);
            dispatch('alert/error', error.response.data.message, {root: true})
        })
    },

    setDialogVisibilityReceipt({dispatch, commit}, {visibility}){
        commit('setDialogVisibleReceipt', visibility);
    },

    handleSelectReceipt({dispatch, commit}, {id, name}){
        const selectedReceipt = { id, name };
        const dialogVisibility = false;
        commit('setSelectedReceipt', selectedReceipt);
        commit('setDialogVisibleReceipt', dialogVisibility);
    },

    handleCloseSelectionReceipt({dispatch, commit}){
        const selectedReceipt = { id: null, name: '' };
        commit('setSelectedReceipt', selectedReceipt);
    },

    setEditedItem({dispatch, commit}, {item}){
        commit('setEditedItem', item);
    }
}

const mutations = {
    setReceipt(state, receipt){
        state.receipt = receipt
    },

    setReceipts(state, receipts){
        state.receipts = receipts.receipts;
        state.totalCount = receipts.totalCount;
    },

    setCurrent(state, current){
        state.current = current
    },

    setPageSize(state, pageSize){
        state.pageSize = pageSize
    },

    setDialogVisibleReceipt(state, visible){
        state.dialogVisibleReceipt = visible
    },

    setSelectedReceipt(state, selectedReceipt){
        state.selectedReceipt = selectedReceipt
    },

    setReceiptItem(state, item){
        state.receiptItem = item
    },

    setReceiptItems(state, items){
        state.receiptItems = items
    },

    setEditedItem(state, item){
        state.editedItem = item;
        const foundedItem = state.editedData.find(({ id }) => id === item.id);
        if(foundedItem){
            state.editedData[foundedItem] = item;
        }else {
            state.editedData.push(item)
        }
    },
}

export  const receiptModule = {
    namespaced: true,
    state,
    actions,
    mutations
}