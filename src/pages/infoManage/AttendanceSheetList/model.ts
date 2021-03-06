import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addAttendList, queryAttendList, removeAttendList, updateAttendList } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: BasicListItemDataType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'infoManageAndAttendanceSheetList',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAttendList, payload);
      console.log(response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
    });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryAttendList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeAttendList : updateAttendList;
      } else {
        callback = addAttendList;
      }
      const response = yield call(callback, payload); // post
      console.log(response)
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state = { list: [] }, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};

export default Model;
