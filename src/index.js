import './pages/index/index.sass';
import './assets/sass/styles.sass';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('./components', true, /\.(js)$/));
importAll(require.context('./pages', true, /\.(js)$/));
