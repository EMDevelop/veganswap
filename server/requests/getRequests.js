module.exports.thing = async function (req, res) {
  await getNonVeganIngredientAndRecipe(req, res);
};

const getNonVeganIngredientAndRecipe = async (req, res) => {
  try {
    const response = await db.query(
      `SELECT id, isvegan,CASE WHEN (variety IS NULL ) THEN name WHEN (variety ='' ) THEN name ELSE name || ', ' || variety END AS name, 'ingredient' AS type FROM ingredient  WHERE isVegan = 'n'
      UNION
      SELECT id, isvegan, title as name, 'recipe' AS type FROM recipe WHERE isVegan = 'n'
      ORDER BY name DESC;
      `
    );
    console.log('hello');
    res.status(200).json({
      status: 'success',
      data: {
        swapList: response.rows,
      },
    });
  } catch (err) {
    res.json({
      status: 'failure',
      error: err,
    });
  }
};
