import {
  Collection,
  FilterType,
} from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";

export const findOne = async <C>(
  selectDetail: FilterType<C>,
  model: Collection<C>
) => {
  return await model.findOne(selectDetail);
};
