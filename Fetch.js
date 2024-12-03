async function Fetch(link) {

  const response = await fetch(link);
  const data = await response.json();

  return data;
}

export { Fetch };
