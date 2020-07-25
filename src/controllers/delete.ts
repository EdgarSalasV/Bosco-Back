import { statusEntities } from "../types/statusEntities";

export const deleteEntityItem = (
  id: string,
  ENTITY: any
): Promise<string[]> => {
  return new Promise((resolve: any, reject: any) => {
    try {
      let statusDelete = ENTITY.update(id, { status: statusEntities.Deleted });
      resolve(statusDelete);
    } catch (error) {
      console.log('error', error)
      reject(error);
    }
  });
};
