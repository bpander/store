import './index.css';

import { createStore } from './store';
import { lens } from './store/lens';

interface State { deeply: { nested: { state: number } } };
const l = lens<State>();
const initial: State = { deeply: { nested: { state: 8 } } };
const updates: State = { deeply: { nested: { state: 8 } } };
const foo = l.k('deeply').k('nested').k('state').set(() => 8)(initial);
// console.log(foo === initial);
// console.log(foo === updates);

const outerStore = createStore({ deeply: { nested: { state: 3 } } });
const deeplyStore = outerStore.k('deeply');
const nestedStore = deeplyStore.k('nested');
const stateStore = nestedStore.k('state');

outerStore.subscribe(v => console.log('outerStore', v));
deeplyStore.subscribe(v => console.log('deeplyStore', v));
nestedStore.subscribe(v => console.log('nestedStore', v));
stateStore.subscribe(v => console.log('stateStore', v));

const test = () => {
  // debugger;
  console.log('=== update nested');
  nestedStore.update(() => ({ state: 3 }));

  console.log('=== update inner');
  nestedStore.k('state').update(() => 3);

  console.log('done');
};
test();