import {
  Collection,
  DocumentType,
} from "https://deno.land/x/mongo@v0.12.1/ts/collection.ts";

export const creating = async <C>(
  createDetail: DocumentType<C>,
  model: Collection<C>
) => {
  return await model.insertOne(createDetail);
};
