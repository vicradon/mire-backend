const http = require("./utils/http");

const fetchData = async () => {
  try {
    const response = await http.post("/breezeapi/v1/ChallengeBVN", {
      channel_code: "APIC",
      bvn: "22273209101",
      merchant_code: "M1000005",
      reference_number: "992039110099122",
    });
    console.log(response.data);
  } catch (error) {
    console.log("an error occured");
  }
};

fetchData();
