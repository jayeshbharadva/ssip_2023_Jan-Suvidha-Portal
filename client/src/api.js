const PORT = 3108;

export const getallscheme = async () => {
  try {
    const response = await fetch(`http://localhost:3108/gov/getallscheme`);
    const jsonop = await response.json();
    const data = jsonop.data;
    console.log("data is ::", data);
    return {
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Api call failed",
    };
  }
};
