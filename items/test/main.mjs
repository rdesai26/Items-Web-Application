import {expect, should} from 'chai';
import Item from '../models/items.mjs';

describe('Item Test', function () {
    it('Create', async function () {
        let itemCreated = await Item.create({id: 999, name:'apple',price:4.33})
        expect(itemCreated).to.not.be.empty;
        expect(itemCreated).to.be.a('object');
        expect(itemCreated).to.have.property('id').to.be.a('number').to.equal(999);
        expect(itemCreated).to.have.property('name').to.be.a('string').to.equal('apple');
        expect(itemCreated).to.have.property('price').to.be.a('number').to.equal(4.33);
        let itemCreated2 = await Item.create({id: '998', name: 342.23, price:'2.99'});
        expect(itemCreated2).to.be.a('object');
        expect(itemCreated2).to.have.property('id').to.be.a('number').to.equal(998);
        expect(itemCreated2).to.have.property('name').to.be.a('string').to.equal('342.23');
        expect(itemCreated2).to.have.property('price').to.be.a('number').to.equal(2.99);
    });
    it('Update', async function () {
        await Item.update(999, {name:'new-apple', price:5.33});
        let itemEdited = await Item.get(999);
        expect(itemEdited).to.not.be.empty;
        expect(itemEdited).to.be.a('object');
        expect(itemEdited).to.have.property('id').to.be.a('number').to.equal(999);
        expect(itemEdited).to.have.property('name').to.be.a('string').to.equal('new-apple');
        expect(itemEdited).to.have.property('price').to.be.a('number').to.equal(5.33);
    });
    it('Delete', async function() {
        await Item.delete(999);
        expect(await Item.get(999)).to.be.null;
        await Item.delete(998);
        expect (await Item.get(998)).to.be.null;
    });
});

after(function () {
    Item.close();
})