import useGetHistoryAPI from '@/apis/client/orders/virtual-treasure/use-get-history'

function useHistoryView() {
  const { data: historyList, isLoading, error } = useGetHistoryAPI()

  return {
    isLoading,
    error,
    historyList,
  }
}

export default useHistoryView
