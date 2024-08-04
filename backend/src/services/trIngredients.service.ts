import { prisma } from "../bin/database";
import { trIngredientTypesMandatory } from "../types/db-schema/trIngredients";
import * as _ from 'lodash';

export const createManyTrIngredients = ({ data }: { data: trIngredientTypesMandatory[]; }) => {
  const resData = _.map(data, ({ calorie_id, meal_id, measure }) => ({ calorie_id, meal_id, measure }));

  return prisma.tr_ingredients.createMany({
    data: resData
  });
};