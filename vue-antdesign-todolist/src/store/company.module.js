import CompanyService from '../services/company.serivce';
import router from '../router';

const state = {
  company: null,
  companies: null,
  current: 1,
  pageSize: 10,
  totalCount: 0,
  dialogVisibleCompany: false,
  selectedCompany: {
    id: null,
    name: '',
  }
}

const actions = {
  createCompany({dispatch, commit}, {name, description, address, phone, email}){
    CompanyService.createCompany({name, description, address, phone, email}).then(
      company => {
        commit('createCompanySuccess', company.data);
        dispatch('alert/success', 'Todo created success!', {root:true});
        router.push('/references/company');
      }
    ).catch(error => {
      commit('createCompanyFailure');
      dispatch('alert/error', error.response.data.message, {root:true})
    })
  },

  getAllCompanies({dispatch, commit}, {current, pageSize}){
    const take = pageSize;
    const skip = (current === 0) ? 0 : pageSize * (current - 1);
    CompanyService.getAllCompanies({take, skip}).then(
      companies => {
        commit('currentSet', current);
        commit('pageSizeSet', pageSize);
        commit('getAllCompaniesSuccess', companies.data);
      }
    ).catch(error => {
      commit('getAllCompaniesFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  },

  getCompanyById({dispatch, commit}, {id}){
    CompanyService.getCompanyById({id}).then(
      company => {
        commit('getCompanyByIdSuccess', company.data);
      }
    ).catch(error => {
      commit('getCompanyByIdFailure');
      dispatch('alert/error', error.response.data.message, {root: true});
    })
  },

  updateCompany({dispatch, commit}, {id, name, description, address, phone, email}){
    CompanyService.updateCompany({id, name, description, address, phone, email}).then(
        company => {
          commit('updateCompanySuccess', company.data);
          dispatch('alert/success', 'Company updates success!', {root: true})
          router.push('/references/company');
        }
    ).catch(error => {
      commit('updateCompanyFailure');
      dispatch('alert/error', error.response.data.message, {root: true})
    })
  },

  deleteCompany({dispatch, commit}, {id}){
    CompanyService.deleteCompany({id}).then(
        company => {
          commit('deleteCompanySuccess', company);
          dispatch('alert/success', 'Company updated success', {root: true})
          router.go(0);
        }
    ).catch(error => {
      commit('deleteCompanyFailure');
      dispatch('alert/error', error.response.data.message, {root: true})
    })
  },

  setDialogVisibilityCompany({dispatch, commit}, {visibility}) {
    commit('setDialogVisibility', visibility);
  },

  handleSelectCompany({dispatch, commit}, {id, name}) {
    const selectedCompany = { id: id, name: name };
    const visibility = false;
    commit('setSelectedCompany', selectedCompany);
    commit('setDialogVisibility', visibility);
  },

  handleCloseSelectionCompany({dispatch, commit}){
    const selectedCompany = { id: null, name: '' };
    commit('setSelectedCompany', selectedCompany);
  }

}

const mutations = {
  createCompanySuccess(state, company){
    state.company = company;
  },

  createCompanyFailure(state){
    state.company = null;
  },

  getAllCompaniesSuccess(state, companies){
    state.companies = companies.companies;
    state.totalCount = companies.total;
  },

  getAllCompaniesFailure(state){
    state.companies = null;
  },

  getCompanyByIdSuccess(state, company){
    state.company = company;
  },

  getCompanyByIdFailure(state){
    state.company = null;
  },

  updateCompanySuccess(state, company){
    state.company = company;
  },

  updateCompanyFailure(state){
    state.company = null;
  },

  deleteCompanySuccess(state, company){
    state.company = company;
  },

  deleteCompanyFailure(state){
    state.company = null;
  },

  currentSet(state, current){
    state.current = current;
  },

  pageSizeSet(state, pageSize){
    state.pageSize = pageSize;
  },

  setDialogVisibility(state, visibility){
    state.dialogVisibleCompany = visibility;
  },

  setSelectedCompany(state, selectedCompany){
    state.selectedCompany = selectedCompany;
  },
}

export const companyModule = {
  namespaced: true,
  state,
  actions,
  mutations
}