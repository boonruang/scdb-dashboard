import {
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const addHerbal = async (data) => {
  await httpClient.post(`${server.HERBAL_URL}`, data);
};

export const getNewHerbalId = async () => {
  return (await httpClient.get(`${server.HERBAL_URL}/newid`)).data;
};


