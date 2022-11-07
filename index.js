const csv = require("csv-parser");
const fs = require("fs");
const {hash} = require("./hash")
const {Parser} = require("json2csv")



const hashCsv = (filename) => {

    const newData = [];

    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", function (data) {
        dic = {
          id: data["Serial Number"],
          name: data.Filename,
          description: data.Description,
          gender: data.Gender,
          uuid: data.UUID,
          collection: {
            name: "Zuri NFT Tickets for Free Lunch",
            id: "b774f676-c1d5-422e-beed-00ef5510c64d",
            attributes: [
              {
                type: "description",
                value: "Rewards for accomplishments during HNGi9.",
              },
            ],
          },
        };
        // console.log(dict)
        const HASH = hash(JSON.stringify(dic))
        data.HASH = HASH
        // console.log(HASH[0])
        newData.push(data)
    })
    .on("end", function () {
        const parser = new Parser(Object.keys(newData[0]));
        const result = parser.parse(newData);
        // console.log(result)
        fs.writeFileSync("./output.csv", result); 
    })
    
};

hashCsv("C:/Users/HP/OneDrive/Documents/HNG/csvconverter/Book1.csv")