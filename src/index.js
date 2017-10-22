// Set up your application entry point here...
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { startAddGroup, startAddCard } from './actions/group';

import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';

// import seed from './utils/seed';

const store = configureStore();

// const groupOne = store.dispatch(startAddGroup({ title: 'Animals' }));
// const groupTwo = store.dispatch(startAddGroup({ title: 'Fruits' }));
// const groupThree = store.dispatch(startAddGroup({ title: 'Cars' }));

// const cardOne = store.dispatch(startAddCard(groupOne.group.groupId, { cardTitle: 'Hen', dueDate: 2131211111, description: 'Hen says ko ko' }));
// const cardTwo = store.dispatch(startAddCard(groupOne.group.groupId, { cardTitle: 'Dog', dueDate: 3331312, description: 'Dog says woof' }));
// const cardThree = store.dispatch(startAddCard(groupOne.group.groupId, { cardTitle: 'Cat', dueDate: 44441312, description: 'Cat says meow' }));

// const cardFour = store.dispatch(startAddCard(groupTwo.group.groupId, { cardTitle: 'Apple', dueDate: 44441312, description: 'Steeve Jobs says Hi!' }));
// const cardFive = store.dispatch(startAddCard(groupTwo.group.groupId, { cardTitle: 'Plum', dueDate: 2222212, description: 'Plum is tasty' }));
// const cardSix = store.dispatch(startAddCard(groupTwo.group.groupId, { cardTitle: 'Melon', dueDate: 2177777312, description: 'Melon grows in Kherson' }));
// const cardSeven = store.dispatch(startAddCard(groupTwo.group.groupId, { cardTitle: 'Feihoa', dueDate: 2188888312, description: 'What is faihoa?' }));

// const cardEight = store.dispatch(startAddCard(groupThree.group.groupId, { cardTitle: 'Lada', dueDate: 2133333312, description: 'Russian auto industry sucks' }));
// const cardNine = store.dispatch(startAddCard(groupThree.group.groupId, { cardTitle: 'Ferrari', dueDate: 615555312, description: 'A car you will never have' }));
// adding dummy data;
// seed();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

render(jsx, document.getElementById('app'));
