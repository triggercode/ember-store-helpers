import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Model from 'ember-data/model';
import Adapter from 'ember-data/adapter';
import attr from 'ember-data/attr';

module('Integration | Helper | store/find-record', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('model:user', Model.extend({
      name: attr()
    }));

    this.owner.register('adapter:user', Adapter.extend({
      async queryRecord(_store, _type, query) {
        return {id: query.id, name: 'takkanm'};
      }
    }));
  });

  test('it works', async function(assert) {
    await render(hbs`{{get (store/query-record 'user' (hash id=42)) 'name'}}`);

    assert.equal(this.element.textContent.trim(), 'takkanm');
  });

  test('it returns null if id is empty value', async function(assert) {
    await render(hbs`{{eq (store/query-record 'user' null) null}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    await render(hbs`{{eq (store/query-record 'user' undefined) null}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    await render(hbs`{{eq (store/query-record 'user' '') null}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });
});
