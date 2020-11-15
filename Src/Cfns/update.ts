import {
  Collection,
  FilterType,
} from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";

export const updating = async <C>(
  queryDetail: FilterType<C>,
  updateDetail: FilterType<C>,
  model: Collection<C>
) => {
  return await model.updateOne(queryDetail, updateDetail);
};
