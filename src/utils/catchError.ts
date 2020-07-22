export const catchErrorTypeOrm = (error: any) => {
  const { code, errno, sqlMessage, sqlState, sql } = error;
  const errorStatus = {
    code,
    errno,
    sqlMessage,
    sqlState,
    sql,
  };
  return {
    code: 400,
    errorMessage: errorStatus,
    data: [],
  };
};
