# Redux基础入门

[TOCM]

[TOC]

## Store
保存数据的容器，整个应用只能有一个Store
可通过creatStore函数生成Store
```javascript
import { createStore } from 'redux';
const store = createStore(fn);
//接受一个函数作为参数，返回新生成的 Store 对象
//可以有第二个可选参数，表示一个状态初始值
```
## State
表示Store在某一时刻的快照（状态）  
一个state和一个view一一对应

```javascript
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
```
## Action
是View发出的将要改变State的通知对象。改变 State 的唯一办法就是使用 Action，它会运送数据到 Store。
```javascript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
### Action Creator
一个用于生成Action的方法
```javascript
const ADD_TODO = '添加 TODO';
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');
```
### store.getState()
获取当前store的一个快照状态
```javascript
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
```
## store.dispatch()
`store.dispatch()`是 View 发出 Action 的唯一方法。

```javascript
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```
> 上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。

### store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
store.subscribe(listener);
```
显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
```javascript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```
## Reducer
Store收到Action后给出一个新的State的计算过程称为Reducer  
Reducer 是一个函数，它接受当前的 State 和 Action 作为参数，返回一个新的 State。

```javascript
const reducer = function (state, action) {
  // ...
  return new_state;
};
```
比如一个简单的Reducer，
```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```
实际运用中无需手动调用Reducer函数，执行store.dispatch时会自动出发Reducer方法。Reducer方法由创建Store时作为参数传入。如，
```javascript
import { createStore } from 'redux';
const store = createStore(reducer);//传入reducer方法
//store.dispatch发送过来一个新的 Action，就会自动调用此Reducer
```
为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。
```javascript
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
const total = actions.reduce(reducer, 0); // 3
```
> Reducer是一个“纯函数”，同样的输入必定得到同样的输出，意味着方法中不能包含类似Date.now()这样的方法

Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。
```javascript
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```
## Store的简单实现
createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。
```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];//监听函数列表

  const getState = () => state;//获取当前的state

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  //设置监听函数
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```
## Reducer拆分
将庞大的一整个Reducer拆分成多个小的Reducer
```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};
```
如拆成三个小的Reducer函数
```javascript
const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
};
```
`combineReducers`方法用于将小的Reducer方法合并成一个大的Reducer
```javascript
import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;
```
> 可以把所有子 Reducer 放在一个文件里面，然后统一引入

```javascript
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
```
一个combineReducer的简单实现
```javascript
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
};
```
## Redux 工作流程
1. 用户发出 Action。  
`store.dispatch(action);`
2. Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State   
`let nextState = todoApp(previousState, action);`  
3. State 一旦有变化，Store 就会调用监听函数。  
// 设置监听函数  
`store.subscribe(listener);`  
listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
```javascript
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

## 中间件
中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。  
举例来说，要添加日志功能，把 Action 和 State 打印出来，可以对store.dispatch进行如下改造。
```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```
上面代码中，对store.dispatch进行了重定义，在发送 Action 前后添加了打印功能。这就是中间件的雏形。
## 中间件的使用
如，使用`redux-logger`中间件
```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```
上面代码中，redux-logger提供一个生成器createLogger，可以生成日志中间件logger。然后，将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。
> 注意applyMiddleware传入的中间件参数顺序

### applyMiddlewares()方法
**源码:**
```javascript
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```
> 上面代码中，所有中间件被放进了一个数组chain，然后嵌套执行，最后执行store.dispatch。可以看到，中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法。

## 异步操作
同步操作只需要发出一种Action   
异步操作有三种Action:发起时的Action、成功时的Action、失败时的Action 如，
```javascript
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```
与之对应，State也需要进行改造，如
```javascript
let state = {
  // ...
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 'xxxxxxx'
};
```
> 1. 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染;
2. 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

### redux-thunk中间件
定义一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```
> 先发出一个 Action（requestPosts(postTitle)），表示操作开始。
异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

### redux-promise中间件
使用方式一：
Action Creator 返回一个 Promise 对象
```javascript
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
);

//action createor
const fetchPosts =
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});

//使用
store.dispatch(fetchPosts(store.dispatch，'reactjs'));
```
使用方式二：Action 对象的payload属性是一个 Promise 对象。这需要从redux-actions模块引入createAction方法，并且写法也要变成下面这样

```javascript
import { createAction } from 'redux-actions';
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出同步 Action
    dispatch(requestPosts(selectedPost));
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_POSTS',
      fetch(`/some/API/${postTitle}.json`)
        .then(response => response.json())
    ));
  }
```
redux-promise的源码:
```javascript
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```
> 从上面代码可以看出，如果 Action 本身是一个 Promise，它 resolve 以后的值应该是一个 Action 对象，会被dispatch方法送出（action.then(dispatch)），但 reject 以后不会有任何动作；如果 Action 对象的payload属性是一个 Promise 对象，那么无论 resolve 和 reject，dispatch方法都会发出 Action。

### redux-saga中间件

---
title: AvatarList
subtitle: 用户头像列表
order: 1
cols: 1
---

一组用户头像，常用在项目/团队成员列表。可通过设置 `size` 属性来指定头像大小。

## API

### AvatarList

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| size | 头像大小 | `large`、`small` 、`mini`, `default` | `default` |

### AvatarList.Item

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| tips | 头像展示文案 | ReactNode\/string | - |
| src | 头像图片连接 | string | - |
