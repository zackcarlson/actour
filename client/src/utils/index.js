export const handleCache = async (
  client,
  searchTerm,
  handleState,
  handleLoading,
  query,
  variableObj,
  getProp
) => {
  const storage = window.localStorage;

  if (storage.getItem(searchTerm)) {
    const data = JSON.parse(window.localStorage.getItem(searchTerm));
    handleState(data);
    handleLoading(false);
  } else {
    const { data } = await client.query({
      query,
      variables: variableObj,
    });

    storage.setItem(searchTerm, JSON.stringify(data[getProp]));
    handleState(data[getProp]);
    handleLoading(false);
  }
};
