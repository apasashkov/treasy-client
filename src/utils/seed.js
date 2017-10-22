import configureStore from '../store/configureStore';
import { addGroup, addCard } from '../actions/group';
const store = configureStore();

export default () => {
    // adding dummy data
const groupOne = store.dispatch(addGroup({ title: 'Animals' }));
const groupTwo = store.dispatch(addGroup({ title: 'Fruits' }));
const groupThree = store.dispatch(addGroup({ title: 'Cars' }));

const cardOne = store.dispatch(addCard(groupOne.group.groupId, { cardTitle: 'Hen', dueDate: 21312, description: 'Hen says ko ko' }));
const cardTwo = store.dispatch(addCard(groupOne.group.groupId, { cardTitle: 'Dog', dueDate: 21312, description: 'Dog says woof' }));
const cardThree = store.dispatch(addCard(groupOne.group.groupId, { cardTitle: 'Cat', dueDate: 21312, description: 'Cat says meow' }));

const cardFour = store.dispatch(addCard(groupTwo.group.groupId, { cardTitle: 'Apple', dueDate: 21312, description: 'Steeve Jobs says Hi!' }));
const cardFive = store.dispatch(addCard(groupTwo.group.groupId, { cardTitle: 'Plum', dueDate: 21312, description: 'Plum is tasty' }));
const cardSix = store.dispatch(addCard(groupTwo.group.groupId, { cardTitle: 'Melon', dueDate: 21312, description: 'Melon grows in Kherson' }));
const cardSeven = store.dispatch(addCard(groupTwo.group.groupId, { cardTitle: 'Feihoa', dueDate: 21312, description: 'What is faihoa?' }));

const cardEight = store.dispatch(addCard(groupThree.group.groupId, { cardTitle: 'Lada', dueDate: 21312, description: 'Russian auto industry sucks' }));
const cardNine = store.dispatch(addCard(groupThree.group.groupId, { cardTitle: 'Ferrari', dueDate: 21312, description: 'A car you will never have' }));
}