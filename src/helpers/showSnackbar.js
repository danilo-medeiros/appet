import Snackbar from 'react-native-snackbar';

const showSnackbar = (title) => {
  Snackbar.show({
    title,
    duration: Snackbar.LENGTH_LONG,
  });
}

export default showSnackbar;