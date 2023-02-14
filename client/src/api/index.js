export const baseUrl = "http://localhost:3001/";
export const submitForm = async (jsonBody, apiString, methodType) => {
  const response = await fetch(baseUrl + apiString, {
    method: methodType,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
  const responseData = await response.json();
  return responseData;
};
