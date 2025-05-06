import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import BUDGET_ENDPOINTS from "../endPoint/budgetEndPoint";

export const getAllBudget = async (setTotalBudget, setBudgetData) => {
  try {
    const res = await axiosInstance.get(BUDGET_ENDPOINTS.GET_BUDGET);
    if (res) {
      console.log("getBudget", res);
      setTotalBudget(res?.data?.totalBudget);
      setBudgetData(res?.data?.budgets);
    }
  } catch (error) {
    console.log("getBudgetError", error);
  }
};

export const getBudgetDetails = async (setBudgetDetails) => {
  try {
    const res = await axiosInstance.get(BUDGET_ENDPOINTS.GET_BUDGET_DETAILS);
    if (res) {
      console.log("getBudgetDetails", res);
      setBudgetDetails(res.data.budgetDetails);
    }
  } catch (error) {
    console.log("getBudgetError", error);
  }
};

export const createBudget = async (data) => {
  try {
    const res = await axiosInstance.post(BUDGET_ENDPOINTS.CREATE_BUDGET, data);
    if (res) {
      toast.success(res.data.message);
      console.log("createBudget", res);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("createBudgetError", error);
  }
};

export const updateBudget = async (data) => {
  try {
    const res = await axiosInstance.post(BUDGET_ENDPOINTS.UPDATE_BUDGET, data);
    if (res) {
      console.log("updateBudget", res);
    }
  } catch (error) {
    console.log("updateBudgetError", error);
  }
};
export const deleteBudget = async (data) => {
  try {
    const res = await axiosInstance.post(BUDGET_ENDPOINTS.DELETE_BUDGET, data);
    if (res) {
      console.log("deleteBudget", res);
    }
  } catch (error) {
    console.log("deleteBudgetError", error);
  }
};
