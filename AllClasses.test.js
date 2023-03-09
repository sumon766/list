const ListCollection = require('./__mocks__/AllClasses.js');

const data = new ListCollection();

describe('Test of add and remove functions from To-Do List', () => {
    test('Add one new item to the list', () => {
        document.body.innerHTML = '<div>'
            + '  <ul id="list"><li></li></ul>'
            + '</div>';
        data.setLocalData('New To Do Item');
        const list = document.querySelectorAll('#list li');
        expect(list).toHaveLength(1);
    });

    test('Remove an item from the list', () => {
        const setItem = jest.spyOn(Storage.prototype, 'setItem');
        data.deleteItem();
        expect(setItem).toHaveBeenCalled();
    });

    test('Test edit description function', () => {
        const editBtn = document.querySelectorAll('.editBtn');
        const updateController = document.querySelectorAll('.controller');
        const inputs = document.querySelectorAll('.textarea-container textarea');
        editBtn.forEach((eb, i) => {
            eb.addEventListener('click', () => {
                updateController[i].style.display = 'flex';
                editBtn[i].style.display = 'none';
                inputs[i].disabled = false;
                expect(data.Edit()).toHaveReturnedWith(updateController[i].style.display = 'flex');
                expect(data.Edit()).toHaveReturnedWith(editBtn[i].style.display = 'none');
                expect(data.Edit()).toHaveReturnedWith(inputs[i].disabled = false);
            });
        });
    })

    
});
