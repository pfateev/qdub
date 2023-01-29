export const submitForm = (jsonBody, apiString) => {
  fetch( apiString, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
};
