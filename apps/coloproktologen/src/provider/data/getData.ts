import axiosapi from "./axios";

const getData = async ({ className, query }) => {
  let data = [];

  await axiosapi()
    .get(`classes/${className}`, query)
    .then((response) => {
      data = response.data.results;
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });

  return data;
};

export default getData;
