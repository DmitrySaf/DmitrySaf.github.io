import './pug/pages/index/index.sass';
import './assets/sass/styles.sass';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('./pug/components', true, /\.(js)$/));
importAll(require.context('./pug/pages', true, /\.(js)$/));
