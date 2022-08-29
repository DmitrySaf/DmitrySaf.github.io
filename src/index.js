import './assets/sass/styles.sass';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('./components', true, /\.(js)$/));
importAll(require.context('./pages', true, /\.(js)$/));
importAll(require.context('./components', true, /\.(sass)$/));
importAll(require.context('./pages', true, /\.(sass)$/));
