export async function loginService(data) {
  const user = {
    email: data.email,
    password: data.password,
  };
  console.log("This is user login in service: ", user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auths/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.detail || "Login failed");
  }
  console.log("This is logged user in service: ", result);
  return result;
}

export async function registerService(data) {
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    birthDate: data.birthDate,
  };
  console.log("This is user register in service: ", user);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auths/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );
  const result = await res.json();
  if (!res.ok) {
    if (result.errors) {
      const firstError = Object.values(result.errors)[0];
      throw new Error(firstError);
    }
    throw new Error(result.detail || "Registration failed");
  }
  console.log("This is registered user in service: ", result);
  return result;
}
