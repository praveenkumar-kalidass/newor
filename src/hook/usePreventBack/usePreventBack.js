import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const usePreventBack = () => {
  const navigation = useNavigation();

  const handleSwipe = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', handleSwipe);
    return () => {
      navigation.removeListener('beforeRemove');
    };
  }, []);

  return null;
};

export default usePreventBack;
