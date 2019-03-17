import { RootSwitchNavigator } from '../../navigation/AppNavigator';
import {AFTER_REGISTERATION, USER_LOGGED_IN, USER_LOGGED_OUT, USER_UPDATED, GO_BACK, GO_GUESTS_LIST , ADMIN_LOGGED_IN} from "../actions/actionTypes";
import {NavigationActions} from 'react-navigation';


const firstAction = RootSwitchNavigator.router.getActionForPathAndParams('LoginScreen');
const initialNavState = RootSwitchNavigator.router.getStateForAction(
    firstAction
);

function reducer(state = initialNavState, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Main' }),
                state
            );
        case AFTER_REGISTERATION:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'AccountSuggestions' }),
                state
            );
        case ADMIN_LOGGED_IN:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'ManagementSummary' }),
                state
            );
        case USER_LOGGED_OUT:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'LoginScreen' }),
                state
            );
        case USER_UPDATED:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Main' }),
                state
            );
        case GO_GUESTS_LIST:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Main' }),
                state
            );
        case GO_BACK:
            return RootSwitchNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
        default:
            return RootSwitchNavigator.router.getStateForAction(action, state);
    }
}

export default reducer;