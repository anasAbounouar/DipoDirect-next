export function debounce(fn, delay) {
  // usefull for inputs to delay changes
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
