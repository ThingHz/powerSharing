const Article = require("../models/Article");
module.exports.handler = async (event) => {
const { slug } = event.queryStringParameters;
  try {
    const article = await Article.findOne({
      where: {
        slug: slug,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(article),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ e }),
    };
  }
};
