import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NewsList from './screens/NewsList';

const AppNavigator = createStackNavigator({
  NewsList: { screen: NewsList },
});

export default createAppContainer(AppNavigator);