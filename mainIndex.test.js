import {clearCompleted} from './__mocks__/mainIndex';

describe('Test ClearCompleted Function', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    expect(clearCompleted()).toHaveReturned('setItem');

});