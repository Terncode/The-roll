let once = false;
export function writeHistory(id: string) {
  if (once)
    return;

  once = true;

  const url = `https://www.youtube.com/watch?v=${id}`;
  const statesCount = 5;
  for (let i = 0; i < statesCount; i++) {
    history.pushState({}, "", "/");
  }

  window.addEventListener("popstate", () => {
    alert("If you think you can escape you are wrong");
    location.href = url;
  });
}
