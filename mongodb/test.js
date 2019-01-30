const MongoClient = require(`mongodb`).MongoClient;
const url = `mongodb://localhost:27017/`;



async function joinCollections() {
    const client = MongoClient.connect(url, { useNewUrlParser: true });
    const cl = await client
    const db = cl.db('usersdb')
    const collection = db.collection(`users`);
    const mysort = { name: 1 };
    let data = await collection.aggregate([
      {
        $lookup:
        {
          from: `cars`,
          localField: `user_id`,
          foreignField: `user_id`,
          as: `cardetails`
        }
      },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: [`$cardetails`, 0] }, `$$ROOT`] } } },
      { $project: { cardetails: 0 } }
    ]).sort(mysort).toArray()
    console.log(data)
    cl.close()
  };

  joinCollections()
  