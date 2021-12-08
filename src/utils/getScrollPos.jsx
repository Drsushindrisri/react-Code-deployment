export const getScrollPos = () =>
  (window.pageYOffset || document.documentElement.scrollTop) -
  (document.documentElement.clientTop || 0);
