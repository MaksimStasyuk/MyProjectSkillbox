export const createPreloader = () => {
  const $preloaderBlock = document.createElement('div');
  const $preloaderCircle = document.createElement('div');

  $preloaderBlock.classList.add('preloader');
  $preloaderCircle.classList.add('preloader__circle')

  // preloaderCircle.innerHTML = svgPreloadMain;

  $preloaderBlock.append($preloaderCircle);

  return $preloaderBlock;
};