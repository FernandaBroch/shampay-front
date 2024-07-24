import axios, { Axios, AxiosPromise } from "axios"
import { Transaction } from "../interface/Transaction"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<Transaction[]> => {
  const response = axios.get(API_URL + '/transactions')
  return response
}
export function useTransactionData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['transaction-data'],
    retry: 2
  })
  return {
    ...query,
    transactionData: query.data?.data
  }
}