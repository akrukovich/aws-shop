const formatJSONResponse = (response: any, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(response),
});

export default formatJSONResponse;
