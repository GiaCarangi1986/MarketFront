export async function CheckAuthorisationUser() { //проверка авторизации
  let result = await fetch(
    "https://localhost:44332/api/Account/isAuthenticated",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "access-control-expose-headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );
  const status = result.status;
  const error = result.error;

  result = await result.json();
  console.log("result", result);
  return {
    result: result,
    status: status,
    error: error
  };
}