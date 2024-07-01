import request from "@/utils/request.js";

export const getHistoriesService = (userId) => {
    return request.get('/history?userId=' + userId);
}

export const updateHistoryService = (historyDate) => {
    return request.put('/history', historyDate);
}