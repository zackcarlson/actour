export const handleCache = async (
  client,
  searchTerm,
  handleState,
  handleLoading,
  query,
  variableObj,
  getProp,
  action,
  dispatch
) => {
  const storage = window.localStorage;

  if (storage.getItem(searchTerm)) {
    const data = JSON.parse(storage.getItem(searchTerm));
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
    if (action) {
      action(dispatch, data);
    }
  }
};

export const getCachedCredits = () => {
  const params = window.location.pathname.split("/").slice(2);
  params[0] = params[0].replace(/%20/g, " ");
  params.push("credits");
  const cachedId = params.join("-");

  return JSON.parse(window.localStorage.getItem(cachedId));
};
